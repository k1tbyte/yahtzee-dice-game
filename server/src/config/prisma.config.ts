import { prisma } from '../lib/prisma';

export const initializeDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('Database initialized successfully with Prisma');
        return prisma;
    } catch (error) {
        console.error('Database initialization failed:', error);
        throw error;
    }
};

export const disconnectDatabase = async () => {
    await prisma.$disconnect();
    console.log('Database disconnected');
};
