import { verifyAcessToken } from './../utils/jwt';
import * as userServices from './../services/user';
import asyncHandler from 'express-async-handler'
import { Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';

const authorize = (roles: any = []) => {
    return asyncHandler((async(req: any, res: Response, next: NextFunction) => {
        let token = req.headers.authorization as string | undefined;;
        if (!token) {
            return next(new ApiError('Token not found', 401));
        }

        token = token.split(' ')[1];
        const user = verifyAcessToken(token) as any;
        const userRecord = await userServices.getOne(user.userId);

        if (!userRecord) {
            return next(new ApiError('Invalid Token! User not found', 404));
        }

        if (roles.length && !roles.includes(userRecord.role)) {
            return next(new ApiError('Unauthorized', 403));
        }
        req.user = userRecord;
        next();
    }))
}

export default authorize;
