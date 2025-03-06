import * as taskServices from '../services/task'
import { Request, Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'


export const create = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const task = await taskServices.create(req);
    res.status(201).json({ message: 'Task added successfully', task });
});

export const getOne = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.taskId
    const task = await taskServices.getOne(taskId);
    res.status(200).json({ message: 'Task retrevie successfully', task });
});

export const getAll = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { tasks, totalTasks, pagination } = await taskServices.getAll(req);
    res.status(200).json({ message: 'Tasks Retrieved successfully', totalTasks, pagination, tasks });
});

export const update = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const task = await taskServices.update(req);
    res.status(200).json({ message: 'Task updated successfully', task});
});

export const deleteOne = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    await taskServices.deleteOne(req);
    res.status(204).json({ message: 'Task deleted successfully' });
});

export const assignUserToTask = asyncHandler(async (req: Request, res: Response) => {
    const { taskId, userId } = req.body;
    const assignment = await taskServices.assignUserToTask(taskId, userId);
    res.status(201).json({ message: "User assigned to task successfully", assignment });
});

export const getUsersAssignedToTask = asyncHandler(async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const users = await taskServices.getUsersAssignedToTask(taskId);
    res.json({ message: "users Retrieved successfully", users});
});

export const getTasksAssignedToUser = asyncHandler(async (req: Request, res: Response) => {
    const { tasks, source } = await taskServices.getTasksAssignedToUser(req);
    res.json({message: "Tasks Retrieved successfully", source, tasks});
});

export const removeUserFromTask = asyncHandler(async (req: Request, res: Response) => {
    const { taskId, userId } = req.body;
    await taskServices.removeUserFromTask(taskId, userId);
    res.json({ message: "User removed from task" });
});

