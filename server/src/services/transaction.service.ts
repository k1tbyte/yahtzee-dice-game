import { injectable, inject } from 'tsyringe';
import { TransactionRepository } from '../repositories/transaction.repository';
import { Transaction, type TransactionType } from '../data/entities/transaction.entity';

@injectable()
export class TransactionService {
    constructor(
        @inject('TransactionRepository') private transactionRepository: TransactionRepository
    ) {}


    public async createTransaction(value: number, type: TransactionType): Promise<Transaction> {
        return this.transactionRepository.createTransaction(value, type);
    }

    public async getBalance(): Promise<number> {
        return this.transactionRepository.getTotalBalance();
    }


    public async getAllTransactions(): Promise<Transaction[]> {
        return this.transactionRepository.getAllTransactions();
    }

    public async placeBet(amount: number): Promise<void> {
        const currentBalance = await this.getBalance();

        if (currentBalance < amount) {
            throw new Error('Insufficient balance');
        }

        await this.createTransaction(-amount, 'Bet');
    }


    public async addWinning(amount: number): Promise<void> {
        await this.createTransaction(amount, 'Win');
    }
}