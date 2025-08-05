import { injectable, inject } from 'tsyringe';
import { TransactionRepository } from '../repositories/transaction.repository';
import { type TransactionType } from '../types/prisma.types';

@injectable()
export class TransactionService {
    constructor(
        @inject(TransactionRepository) private transactionRepository: TransactionRepository
    ) {}


    public async createTransaction(value: number, type: TransactionType) {
        return this.transactionRepository.createTransaction(value, type);
    }

    public async getAllTransactions() {
        return this.transactionRepository.getAllTransactions();
    }
}