import { z } from "zod";
import { Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'


const createTaskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string(),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
    dueDate: z.string(),
});

const updateTaskSchema = z.object({
    taskId: z.string().length(24, "Invalid user ID format"),
    title: z.string().min(3, "Title must be at least 3 characters long").optional(),
    description: z.string().optional(),
    status: z.enum(["Pending", "In Progress", "Completed"]).optional(),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
    dueDate: z.string().optional(),
});

const TaskByIdSchema = z.object({
    taskId: z.string().length(24, "Invalid Task ID format"),
});

const getTasksSchema = z.object({
    status: z.enum(["Pending", "In Progress", "Completed"]).optional(),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
    dueDate: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
});

const assignTaskSchema = z.object({
    taskId: z.string().length(24, "Invalid task ID format"),
    userId: z.string().length(24, "Invalid user ID format"),
});

const getUserTasksSchema = z.object({
    userId: z.string().length(24, "Invalid user ID format"),
    status: z.enum(["Pending", "In Progress", "Completed"]).optional(),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
    dueDate: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
});



export const createTaskValidator = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const validatedData = createTaskSchema.parse(req.body);
    req.validatedData = validatedData
    next();
});

export const updateTaskValidator = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const validatedData = updateTaskSchema.parse({ taskId: req.params.taskId, ...req.body});
    req.validatedData = validatedData
    next();
});

export const TaskByIdValidator = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    TaskByIdSchema.parse({ taskId: req.params.taskId });
    next();
});

export const getTasksValidator = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    getTasksSchema.parse(req.query);
    next();
});

export const getUserTasksValidator = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    getUserTasksSchema.parse({ userId: req.params.userId, ...req.query });
    next();
});


export const assignTaskValidator = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const validatedData = assignTaskSchema.parse(req.body);
    req.validatedData = validatedData
    next();
});
