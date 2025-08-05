// Import polyfills first (this will ensure reflect-metadata is loaded)
import "./polyfills.js";

// Now import the rest of your modules
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeDatabase } from './config/database.config.js';
import { registerDependencies } from './di-container.js';

// Регистрируем зависимости
registerDependencies();

// Создаем экспресс приложение
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Инициализируем БД и запускаем сервер
async function bootstrap() {
    try {
        await initializeDatabase();

        // Базовый маршрут для проверки
        app.get('/', (req, res) => {
            res.send('Yahtzee API is running!');
        });

        // Здесь позже подключим API маршруты

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

bootstrap();