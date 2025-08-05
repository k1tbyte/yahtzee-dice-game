import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { TransactionService } from '../services/transaction.service';

@injectable()
export class TransactionController {
    constructor(
        @inject('TransactionService') private transactionService: TransactionService
    ) {}

    public async getAllTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const transactions = await this.transactionService.getAllTransactions();
            res.status(200).json(transactions);
        } catch (error) {
            next(error);
        }
    }

    public async getBalance(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const balance = await this.transactionService.getBalance();
            res.status(200).json({ balance });
        } catch (error) {
            next(error);
        }
    }
}