import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

interface AppConfig {
    port: number;
    environment: 'development' | 'production' | 'test';
    logLevel: string;
    database: {
        path: string;
    };
    cors: {
        allowedOrigins: string[];
    };
}

export const config: AppConfig = {
    port: parseInt(process.env.PORT || '3000', 10),
    environment: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
    database: {
        path: process.env.DB_PATH || join(__dirname, '../../game.db')
    },
    cors: {
        allowedOrigins: process.env.CORS_ORIGINS ?
            process.env.CORS_ORIGINS.split(',') :
            ['http://localhost:5173']
    }
};

export const isDevelopment = (): boolean => {
    return config.environment === 'development';
};

export const isProduction = (): boolean => {
    return config.environment === 'production';
};