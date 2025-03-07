import ApiError from "../utils/apiError";
import * as userServices from './user';
import * as taskServices from './task';
import UserTask from "../models/userTask"; 
import TaskHistory from "../models/taskHistory";
import { getCache, setCache, deleteCache, checkKey } from "../utils/redis";


export const assignUserToTask = async (taskId: string, userId: string) => {
    // check available tasks
    await taskServices.getOne(taskId);
    await userServices.getOne(userId);

    const existingAssignment = await UserTask.findOne({ taskId, userId });

    if (existingAssignment) {
        throw new ApiError("User is already assigned to this task", 400);
    }

    await UserTask.create({ taskId, userId });

    await taskServices.invalidateTasksCache(userId);

    await TaskHistory.create({
        taskId,
        userId,
        action: "ASSIGNED",
    });

    return;
};


export const getTasksAssignedToUser = async (req: any) => {
    let tasks;

    const { userId } = req.params;
    await userServices.getOne(userId);  // check user

    const { status, priority, dueDate } =  req.query;

    const query: any = { userId };

    const { filters, skip, page, limit } = taskServices.pagination_filtering_tasks(req.query);

    const cacheKey = `tasks:${userId}:${status || "all"}:${priority || "all"}:${dueDate || "all"}:${page}:${limit}`;
    tasks = await getCache(cacheKey);

    if (tasks) {
        return { tasks, source: "redis" };
    }

    const userTasks = await UserTask.find(query).populate({
                        path: "taskId",
                        match: filters,
                        select: "title status priority dueDate",
                    }).skip(skip).limit(limit)

    tasks = userTasks.filter((userTask) => userTask.taskId !== null);

    await setCache(cacheKey, tasks);

    return { tasks , source: "database"}
};

export const getUsersAssignedToTask = async (taskId: string) => {
    await taskServices.getOne(taskId);
    return await UserTask.find({ taskId }).populate("userId", "name email role");
};

export const removeUserFromTask = async (taskId: string, userId: string) => {
    const existingAssignment = await UserTask.findOne({ taskId, userId });

    if (!existingAssignment) {
        throw new ApiError("User is not assigned to this task", 404);
    }

    await UserTask.deleteOne({ taskId, userId });

    await taskServices.invalidateTasksCache(userId)


    await TaskHistory.create({
        taskId,
        userId,
        action: "UNASSIGNED",
    });

    return;
};

export const checkAuthForTask = async(userId: string, taskId: string) => {
    const user = await userServices.getOne(userId);

    if (user.role == 'Admin' || user.role == 'Manager')
        return;

    const users = await getUsersAssignedToTask(taskId);

    const isUserAssigned = users.some((user) => user.userId._id.toString() === userId.toString());

    if (!isUserAssigned)
        throw new ApiError('You are not authorized for this task', 403);

    return;
}

