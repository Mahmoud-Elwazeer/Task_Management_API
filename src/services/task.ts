import ApiError from "../utils/apiError";
import Task from "../models/task";
import { Request } from "express";
import UserTask from "../models/userTask"; 
import TaskHistory from "../models/taskHistory";
import { deleteCache, checkKey } from "../utils/redis";

export const create = async(req: any) => {
    const validatedData = req.validatedData
    const createdBy = req.user._id;

    const newTask = new Task({
        ...validatedData,
        createdBy,
    });

    await newTask.save();

    await TaskHistory.create({
        taskId: newTask._id,
        userId: req.user._id,
        action: "CREATED",
    });

    return newTask;
}

export const getOne = async(taskId: string) => {
    const task = await Task.findById(taskId);
    if (!task) throw new ApiError("Task not found", 404);

    return task;
}

export const pagination_filtering_tasks = (query: any) => {
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

    await getOne(taskId);

    const task = await Task.findByIdAndUpdate(taskId, req.validatedData, {
        new: true, runValidators: true
    });

    const userTasks = await UserTask.find({ taskId });
    for (const userTask of userTasks) {
        await invalidateTasksCache(userTask.userId.toString());
    }

    await TaskHistory.create({
        taskId,
        userId: req.user._id,
        action: "UPDATED",
        changes: req.validatedData,
    });

    return task;
}


export const deleteOne = async(req: any) => {
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

    await TaskHistory.create({
        taskId,
        userId: req.user._id,
        action: "DELETED",
    });

    return task;
}

export const invalidateTasksCache = async (userId: string) => {
    try {
        const keys = await checkKey(`tasks:${userId}:*`)
        if (keys.length > 0){
            await deleteCache(keys);
        }
    } catch (error) {
        throw new ApiError(`Failed to invalidate cache: ${error}`, 500 );
    }
};
