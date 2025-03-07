import {  NextFunction, Request, Response } from "express";
import ApiError from '../utils/apiError'
import { userRoutes } from "./user";
import { authRoutes } from "./auth";
import { taskRoutes } from "./task";
import { notificationRoutes } from "./notification";

export const handleRoutes = (app: any) => {
    app.get('/', (_: Request, res: Response) => res.json({ message: 'welcome to Task Management API' }));
    app.use('/users', userRoutes);
    app.use('/auth', authRoutes);
    app.use('/tasks', taskRoutes);
    app.use('/notifications', notificationRoutes);

    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(new ApiError(`Can't find this route ${req.originalUrl}`, 404))
    })
}
