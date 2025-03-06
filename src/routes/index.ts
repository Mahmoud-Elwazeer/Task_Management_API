import {  NextFunction, Request, Response } from "express";
import ApiError from '../utils/apiError'
import { userRoutes } from "./user";
import { authRoutes } from "./auth";

export const handleRoutes = (app: any) => {
    app.get('/', (_: Request, res: Response) => res.json({ message: 'welcome to Task Management API' }));
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/auth', authRoutes);

    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(new ApiError(`Can't find this route ${req.originalUrl}`, 404))
    })
}
