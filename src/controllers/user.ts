import * as userServices from '../services/user'
import { Request, Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'
import ensureAdminOrSameUser from '../utils/checkAuth';

export const create = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.create(req);
    res.status(201).json({ message: 'User added successfully', user });
});

export const getCurrentUser = asyncHandler(async(req: any, res: Response, next: NextFunction) => {
    const user = req.user;
    res.status(200).json({ message: 'User retrevie successfully', user });
});

export const getOne = asyncHandler(async(req: any, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    await ensureAdminOrSameUser(req.user, userId, 'user');
    const user = await userServices.getOne(userId);
    res.status(200).json({ message: 'User retrevie successfully', user });
});


export const getAll = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { users, totalUsers, pagination } = await userServices.getAll(req);
    res.status(200).json({ message: 'Users Retrieved successfully', totalUsers, pagination, users });
});

export const update = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.update(req);
    res.status(200).json({ message: 'User updated successfully', user});
});


export const deleteOne = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    await userServices.deleteOne(req);
    res.status(204).json({ message: 'User deleted successfully' });
});
