import * as taskCommentServices from '../services/taskComment'
import { Request, Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'
import notificationQueue from '../queues/notification';

export const createTaskComment = asyncHandler(async(req: any, res: Response, next: NextFunction) => {
    const taskComment = await taskCommentServices.create(req);

    await notificationQueue.add("taskEvent", {
        type: "TASK_COMMENTED",
        taskId: taskComment._id,
        userId: req.user._id,
    });

    res.status(201).json({ message: 'Task Comment added successfully', taskComment });
});

export const getTaskComments = asyncHandler(async(req: any, res: Response, next: NextFunction) => {
    const taskComments = await taskCommentServices.getTaskComments(req);

    res.status(200).json({ message: 'Task Comment retreive successfully', taskComments });
});

export const deleteTaskComment = asyncHandler(async(req: any, res: Response, next: NextFunction) => {
    await taskCommentServices.deleteOne(req);

    await notificationQueue.add("taskEvent", {
        type: "TASK_COMMENT_DELETED",
        taskId: req.params.taskId,
        userId: req.user._id,
    });

    res.status(200).json({ message: 'Task Comment deleted successfully' });
});


