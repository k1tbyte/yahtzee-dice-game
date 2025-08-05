export class AppError extends Error {
    /**
     * @param message Error message
     * @param statusCode HTTP error status code (default 500)
     * @param isOperational Flag indicating whether the error is operational (expected)
     */
    constructor(
        message: string,
        public readonly statusCode: number = 500,
        public readonly isOperational: boolean = true
    ) {
        super(message);

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }


    static notFound(resourceName: string): AppError {
        return new AppError(`${resourceName} not found`, 404);
    }

    static unauthorized(message: string = 'Authorization required'): AppError {
        return new AppError(message, 401);
    }


    static forbidden(message: string = 'Access denied'): AppError {
        return new AppError(message, 403);
    }


    static badRequest(message: string = 'Invalid request'): AppError {
        return new AppError(message, 400);
    }
}