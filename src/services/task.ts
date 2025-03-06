import ApiError from "../utils/apiError";
import Task from "../models/task";
import * as userServices from './user';
import { Request } from "express";
import UserTask from "../models/userTask"; 
import { getCache, setCache, deleteCache, checkKey } from "../utils/redis";

export const create = async(req: any) => {
    const validatedData = req.validatedData
    const createdBy = req.user._id;

    const newTask = new Task({
        ...validatedData,
        createdBy,
    });

    await newTask.save();

    return newTask;
}

export const getOne = async(taskId: string) => {
    const task = await Task.findById(taskId);
    if (!task) throw new ApiError("Task not found", 404);

    return task;
}

const pagination_filtering_tasks = (query: any) => {
    let filters: any = {};

    const { status, priority, dueDate } =  query;
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;

    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (dueDate) filters.dueDate = { $lte: new Date(dueDate as string) };

    return { filters, skip, page, limit }
}

export const getAll = async(req: Request) => {

    const { filters, skip, page, limit } = pagination_filtering_tasks(req.query);

    const tasks = await Task.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 });
    const totalTasks = await Task.countDocuments(filters);
    const pagination = { page, limit }

    return { tasks, totalTasks, pagination };
}

export const update = async(req: any) => {
    const taskId = req.params.taskId;

    const checkTask = await getOne(taskId);

    const task = await Task.findByIdAndUpdate(taskId, req.validatedData, {
        new: true, runValidators: true
    });

    const userTasks = await UserTask.find({ taskId });
    for (const userTask of userTasks) {
        await invalidateTasksCache(userTask.userId.toString());
    }

    return task;
}


export const deleteOne = async(req: Request) => {
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId);

    if (!task) {
        throw new ApiError("Task not found", 404);
    }

    await task.deleteOne();

    const userTasks = await UserTask.find({ taskId });
    for (const userTask of userTasks) {
        await invalidateTasksCache(userTask.userId.toString());
    }

    return;
}


export const assignUserToTask = async (taskId: string, userId: string) => {
    // check available tasks
    await getOne(taskId);
    await userServices.getOne(userId);

    const existingAssignment = await UserTask.findOne({ taskId, userId });

    if (existingAssignment) {
        throw new ApiError("User is already assigned to this task", 400);
    }

    await UserTask.create({ taskId, userId });

    await invalidateTasksCache(userId)

    return;
};


export const getTasksAssignedToUser = async (req: any) => {
    let tasks;

    const { userId } = req.params;
    await userServices.getOne(userId);  // check user

    const { status, priority, dueDate } =  req.query;

    const query: any = { userId };

    const { filters, skip, page, limit } = pagination_filtering_tasks(req.query);

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
    return await UserTask.find({ taskId }).populate("userId", "name email role");
};

export const removeUserFromTask = async (taskId: string, userId: string) => {
    const existingAssignment = await UserTask.findOne({ taskId, userId });

    if (!existingAssignment) {
        throw new ApiError("User is not assigned to this task", 404);
    }

    await invalidateTasksCache(userId)

    return await UserTask.deleteOne({ taskId, userId });
};

const invalidateTasksCache = async (userId: string) => {
    try {
        const keys = await checkKey(`tasks:${userId}:*`)
        if (keys.length > 0){
            await deleteCache(keys);
        }
    } catch (error) {
        throw new ApiError(`Failed to invalidate cache: ${error}`, 500 );
    }
};
