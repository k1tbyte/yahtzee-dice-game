import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { TransactionService } from '../services/transaction.service';

@injectable()
export class TransactionController {
    constructor(
        @inject(TransactionService) private transactionService: TransactionService
    ) {}

    public async getAllTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const transactions = await this.transactionService.getAllTransactions();
            res.status(200).json(transactions);
        } catch (error) {
            next(error);
        }
    }
}