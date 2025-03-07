import * as taskServices from '../services/task'
import { Request, Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'
import notificationQueue from '../queues/notification';
import publishMessage from '../services/eventPublisher';

export const create = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const task = await taskServices.create(req);

    await publishMessage("task.created", {
        taskId: task._id,
        title: task.title,
        userId: task.createdBy,
    });

    // Add notification job
    await notificationQueue.add("taskEvent", {
        type: "TASK_CREATED",
        taskId: task._id,
        userId: task.createdBy,
    });

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

export const update = asyncHandler(async(req: any, res: Response, next: NextFunction) => {
    const task = await taskServices.update(req);

    if (task) {
        await publishMessage("task.updated", {
            taskId: task._id,
            changes: req.body,
        });

        await notificationQueue.add("taskEvent", {
            type: "TASK_UPDATED",
            taskId: task._id,
            deletedBy: req.user._id,
            userId: task.createdBy,
        });

    }
        

    res.status(200).json({ message: 'Task updated successfully', task});
});

export const deleteOne = asyncHandler(async(req: any, res: Response, next: NextFunction) => {
    const task = await taskServices.deleteOne(req);

    await notificationQueue.add("taskEvent", {
        type: "TASK_DELETED",
        taskId: task._id,
        updatedBy: req.user._id,
        userId: task.createdBy,
    });


    res.status(204).json({ message: 'Task deleted successfully' });
});
