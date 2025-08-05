import { type Request, type Response, type NextFunction } from 'express';

/**
 * Middleware for logging HTTP requests
 * Records information about incoming requests: method, URL, IP, request time, and request body
 */
export const requestLoggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const timestamp = new Date().toISOString();

    const logData = {
        timestamp,
        method: req.method,
        url: req.originalUrl || req.url,
        ip: req.ip || req.socket.remoteAddress,
        userAgent: req.get('user-agent') || 'unknown',
    };

    // Add the request body for methods that may contain it
    // But only if it is not a file upload (to avoid logging binary data)
    if (['POST', 'PUT', 'PATCH'].includes(req.method) &&
        !req.is('multipart/form-data') &&
        Object.keys(req.body).length) {
        const sanitizedBody = { ...req.body };

        // Remove confidential information, if any
        if (sanitizedBody.password) sanitizedBody.password = '******';
        if (sanitizedBody.token) sanitizedBody.token = '******';

        Object.assign(logData, { body: sanitizedBody });
    }

    console.log(`[REQUEST] ${logData.method} ${logData.url}`, logData);

    // Add the start time of the request to measure performance
    res.locals.startTime = Date.now();

    res.on('finish', () => {
        const responseTime = Date.now() - res.locals.startTime;
        console.log(`[RESPONSE] ${req.method} ${req.originalUrl || req.url} ${res.statusCode} - ${responseTime}ms`);
    });

    next();
};