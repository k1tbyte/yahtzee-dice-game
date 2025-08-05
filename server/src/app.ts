import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { apiRouter } from './routes/api.routes';
import { errorHandlerMiddleware } from './middleware/error-handler.middleware';
import { requestLoggerMiddleware } from './middleware/request-logger.middleware';

export const createApp = () => {
    const app = express();

    // Middlewares
    app.use(cors());
    app.use(bodyParser.json());
    app.use(requestLoggerMiddleware);

    // Routes
    app.use('/api', apiRouter);

    // Error handling
    app.use(errorHandlerMiddleware);

    return app;
};