import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database.config';
import { Transaction, type TransactionType } from '../data/entities/transaction.entity';

@injectable()
export class TransactionRepository {
    private repository: Repository<Transaction>;

    constructor() {
        this.repository = AppDataSource.getRepository(Transaction);
    }

    public async createTransaction(value: number, type: TransactionType): Promise<Transaction> {
        const transaction = new Transaction();
        transaction.value = value;
        transaction.type = type;

        return this.repository.save(transaction);
    }

    public async getTotalBalance(): Promise<number> {
        const result = await this.repository
            .createQueryBuilder('transaction')
            .select('SUM(transaction.value)', 'balance')
            .getRawOne();

        return result?.balance || 0;
    }

    public async getAllTransactions(): Promise<Transaction[]> {
        return this.repository.find({
            order: {
                timestamp: 'DESC'
            }
        });
    }
}