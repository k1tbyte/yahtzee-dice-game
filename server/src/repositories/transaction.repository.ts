import { injectable } from 'tsyringe';
import { type TransactionType } from '../types/prisma.types.js';
import { prisma } from '../lib/prisma.js';

@injectable()
export class TransactionRepository {
    public async createTransaction(value: number, type: TransactionType) {
        return prisma.transaction.create({
            data: {
                value,
                type
            }
        });
    }

    public async getTotalBalance(): Promise<number> {
        const result = await prisma.transaction.aggregate({
            _sum: {
                value: true
            }
        });

        return result._sum.value || 0;
    }

    public async getAllTransactions() {
        return prisma.transaction.findMany({
            orderBy: {
                timestamp: 'desc'
            }
        });
    }
}