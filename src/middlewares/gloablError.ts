// Global error Handling middleware
import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import { ZodError } from "zod";

interface AppError {
    statusCode: number;
    status: string;
    message: string;
    // Add other fields if needed (e.g., stack, isOperational, etc.)
}

export const globalError = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500; 
    err.status = err.status || 'error';

    if (err instanceof ZodError) return sendErrorZod(err, res)

    if (process.env.NODE_ENV === 'dev') {
        sendErrorForDev(err ,res)
    } else {
        sendError(err, res)
    }
}

const sendErrorForDev = (err: AppError, res: Response) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        // stack: err.stack,
        });
    }

const sendError = (err: AppError, res: Response) => {
    res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    });
}


const sendErrorZod = (err: ZodError, res: Response) => {
    const statusCode = 400;
    const message = "Validation failed";
    const errors = err.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
    }));

    res.status(statusCode).json({ message, errors });
}

