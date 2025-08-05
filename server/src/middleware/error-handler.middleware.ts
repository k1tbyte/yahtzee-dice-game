import {  type Request, type Response, type NextFunction } from 'express';
import { AppError } from '../utils/error/app-error';

export const errorHandlerMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error(`Error: ${err.message}`);

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
        return;
    }

    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
};