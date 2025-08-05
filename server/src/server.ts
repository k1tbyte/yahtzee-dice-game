// Import polyfills first (this will ensure reflect-metadata is loaded)
import "./polyfills";

// Now import the rest of your modules
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeDatabase } from './config/prisma.config';
import { registerDependencies } from './di-container';
import { apiRouter } from './routes/api.routes';
import {requestLoggerMiddleware} from "./middleware/request-logger.middleware";
import {initializeMultipliers} from "./utils/game-logic";


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(requestLoggerMiddleware);

async function bootstrap() {
    try {
        registerDependencies();
        // Initialize multipliers from config or run RTP analysis
        await initializeMultipliers();
        await initializeDatabase();

        // Подключаем API маршруты
        app.use('/api', apiRouter);

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

bootstrap();