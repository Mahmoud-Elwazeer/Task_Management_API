import * as authServices from './../services/auth';
import { Request, Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'

export const login = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const response = await authServices.login(email, password);
    res.json({ message: 'Login successful', accessToken: response.accessToken, refreshToken: response.refreshToken });
})

export const refreshAccessToken = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const accessToken = await authServices.refreshAccessToken(req);
    res.json({ message: 'Return Access Token successfully', accessToken});
}) 
