import * as taskHistoryServices from '../services/taskHistory'
import { Request, Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'

export const getTaskHistory = asyncHandler(async(req: Request, res: Response) => {
    const history = await taskHistoryServices.getTaskHistory(req);
    res.json({message: "Task History Retrieved successfully", history});
});

export const getTaskInteractions = asyncHandler(async(req: Request, res: Response) => {
    const users = await taskHistoryServices.getTaskInteractions(req);
    res.json({message: "Task Interactions Retrieved successfully", users});
})