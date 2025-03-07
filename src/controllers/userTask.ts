import * as userTaskServices from '../services/userTask'
import { Request, Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'
import notificationQueue from '../queues/notification';


export const assignUserToTask = asyncHandler(async (req: Request, res: Response) => {
    const { taskId, userId } = req.body;
    const assignment = await userTaskServices.assignUserToTask(taskId, userId);

    await notificationQueue.add("taskEvent", {
        type: "TASK_ASSIGNED",
        taskId,
        userId,
    });

    res.status(201).json({ message: "User assigned to task successfully", assignment });
});

export const getUsersAssignedToTask = asyncHandler(async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const users = await userTaskServices.getUsersAssignedToTask(taskId);
    res.json({ message: "users Retrieved successfully", users});
});

export const getTasksAssignedToUser = asyncHandler(async (req: Request, res: Response) => {
    const { tasks, source } = await userTaskServices.getTasksAssignedToUser(req);
    res.json({message: "Tasks Retrieved successfully", source, tasks});
});

export const removeUserFromTask = asyncHandler(async (req: Request, res: Response) => {
    const { taskId, userId } = req.body;

    await userTaskServices.removeUserFromTask(taskId, userId);

    await notificationQueue.add("taskEvent", {
        type: "TASK_UNASSIGNED",
        taskId,
        userId,
    });

    res.json({ message: "User removed from task" });
});
