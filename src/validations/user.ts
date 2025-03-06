import { z } from "zod";
import { Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'
import ApiError from '../utils/apiError';
import User from "../models/user";


const createUserSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["Admin", "Manager", "User"]).optional().refine(
        (role) => {
            const NODE_ENV = process.env.NODE_ENV;
            if ((NODE_ENV === 'prod' ||  NODE_ENV == 'production') && role !== undefined) {
                return false; // Role is not allowed in production
                // to update role you have to admin access and use api for update user
            }
            return true;
        },
        {
            message: "Role is not allowed",
        }
    ),
});

const updateUserSchema = z.object({
    userId: z.string().length(24, "Invalid Task ID format"),
    name: z.string().min(3, "Name must be at least 3 characters long").optional(),
    email: z.string().email("Invalid email format").optional(),
    role: z.enum(["Admin", "Manager", "User"]).optional()
});

const UserByIdSchema = z.object({
    userId: z.string().length(24, "Invalid Task ID format"),
});

const getUsersSchema = z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
});


const checkEmail = async(email: String) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError("User with this email already exists", 400);
    }
    return;
}

export const createUserValidator = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const validatedData = createUserSchema.parse(req.body);

    await checkEmail(validatedData.email);

    req.validatedData = validatedData
    next();
});

export const updateUserValidator = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const validatedData = updateUserSchema.parse({ userId: req.params.userId, ...req.body});

    if (validatedData.email)
        await checkEmail(validatedData.email);

    req.validatedData = validatedData
    next();
});

export const UserByIdValidator = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    UserByIdSchema.parse({ userId: req.params.userId });
    next();
});

export const getUsersValidator = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    getUsersSchema.parse(req.query);
    next();
});
