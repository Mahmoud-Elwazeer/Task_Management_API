import bcrypt from 'bcrypt';
import { generateAcessToken, generateRefreshToken, verifyRefreshToken, verifyAcessToken } from './../utils/jwt';
import * as userServices from './user';
import ApiError from '../utils/apiError';

export const login = async(email: string, password: string) => {
    const user = await userServices.getOne(email);

    const match = await bcrypt.compare(password, user.password);
    if(!match)
        throw new ApiError('Invalid Password', 400);

    // remove comment when activate verification mail
    // if (process.env.NODE_ENV !== 'dev'){
    //     if(!user.isVerified){
    //         throw new ApiError('Please confirm your account', 400 );
    //     }
    // }

    const payload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role
    }

    const accessToken = generateAcessToken(payload);
    if (!accessToken)
        throw new ApiError('Access Token generation failed', 400);

    const refreshToken = generateRefreshToken(payload);
    if (!refreshToken)
        throw new ApiError('Refresh Token generation failed', 500);

    return { accessToken, refreshToken, user };
}

export const refreshAccessToken = async(req: any) => {
    let refreshToken = req.body.refreshToken;

    if (!refreshToken)
        throw new ApiError("Refresh token not found", 401);

    const user = verifyRefreshToken(refreshToken) as any;
    if (!user) {
        throw new ApiError('Valid verify Token', 401);
    }

    const payload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }

    const accessToken = generateAcessToken(payload);
    if (!accessToken)
        throw new ApiError('Access Token generation failed', 500);

    return accessToken;
}
