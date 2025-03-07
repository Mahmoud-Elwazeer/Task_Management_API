import * as notificServices from '../services/notification'
import { Request, Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'

export const getUserNotic = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const notification = await notificServices.getUserNotic(req);
    res.status(200).json({ message: 'Notifications Retrieved successfully', notification });
});

export const markNotificationAsRead = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const notification = await notificServices.markNotificationAsRead(req);
    res.status(200).json({ message: 'Notifications updated successfully', notification });
});

