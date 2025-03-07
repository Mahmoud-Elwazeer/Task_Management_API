import jwt from 'jsonwebtoken';
import ApiError from './apiError'
import 'dotenv/config';


interface TokenPayload {
    userId: string;
    email: string;
    role: string;
}

const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
const access_token_expriation = process.env.ACCESS_TOKEN_EXPIRATION;

const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET;
const refresh_token_expriation =  process.env.REFRESH_TOKEN_EXPIRATION;

export const generateAcessToken = (payload: TokenPayload) => {
    if (!access_token_secret || !access_token_expriation) {
        throw new ApiError("Secret key or access_token_expriation is not defined", 500);
    }
    return jwt.sign(payload, access_token_secret, { expiresIn: access_token_expriation });
}

export const generateRefreshToken = (payload: TokenPayload) => {
    if (!refresh_token_secret || !refresh_token_expriation) {
        throw new ApiError("Secret key or refresh_token_expriation is not defined", 500);
    }
    return jwt.sign(payload, refresh_token_secret, { expiresIn: refresh_token_expriation });
}

export const verifyAcessToken = (token: string) => {
    try {
        if (!access_token_secret) {
            throw new ApiError("Secret key or access_token_expriation is not defined", 500);
        }
        return jwt.verify(token, access_token_secret);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new ApiError('Token expired', 401);
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError('Invalid token', 401);
        } else {
            throw new ApiError('Internal server error', 500);
        }
    }

};

export const verifyRefreshToken = (token: string) => {
    try {
        if (!refresh_token_secret) {
            throw new ApiError("Secret key or refresh_token_expriation is not defined", 500);
        }
        return jwt.verify(token, refresh_token_secret);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new ApiError('Token expired', 401);
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError('Invalid token', 401);
        } else {
            throw new ApiError('Internal server error', 500);
        }
    }

};