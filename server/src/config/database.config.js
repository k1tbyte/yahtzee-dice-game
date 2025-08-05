import "reflect-metadata";
import { DataSource } from 'typeorm';
import { join } from 'path';
import path from "node:path";

// Определяем базовый путь в зависимости от среды
const isDist = __dirname.includes('dist');
const basePath = isDist ? '../../' : '../../../';

// Конфигурация соединения с БД
export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: join(__dirname, basePath, 'game.db'),
    entities: [path.join(__dirname, "dist/data/entities/**/*.js")],
    synchronize: false,
    logging: true,
    migrations: [join(__dirname, '../data/migrations/**/*.ts')],
});

// Функция инициализации БД для использования в server.ts
export const initializeDatabase = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log('Database initialized successfully');
    }
    return AppDataSource;
};

// Для TypeORM CLI и миграций
export default AppDataSource;