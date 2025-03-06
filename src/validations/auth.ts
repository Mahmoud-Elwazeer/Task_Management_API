import { z } from "zod";
import { Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler'

export const loginUserSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUserValidator = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const validatedData = loginUserSchema.parse(req.body);
    req.validatedData = validatedData
    next();
});