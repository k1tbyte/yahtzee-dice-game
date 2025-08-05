import { injectable, inject } from 'tsyringe';
import { TransactionRepository } from '../repositories/transaction.repository';
import { type RollResultDto } from '../contracts/dto/response/roll-result.dto';
import { AppError } from '../utils/error/app-error';
import {checkCombination, rollDice} from '../utils/game-logic';

@injectable()
export class GameService {
    constructor(
        @inject(TransactionRepository) private transactionRepository: TransactionRepository
    ) {}

    public async initializeGame(): Promise<{ balance: number }> {
        const balance = await this.transactionRepository.getTotalBalance();

        if (balance === 0) {
            await this.transactionRepository.createTransaction(100, 'Init');
            return { balance: 100 };
        }

        return { balance };
    }

    public async getBalance(): Promise<number> {
        return this.transactionRepository.getTotalBalance();
    }

    public async processRoll(bet: number): Promise<RollResultDto> {
        const currentBalance = await this.transactionRepository.getTotalBalance();

        if (currentBalance < bet) {
            throw new AppError('Insufficient balance', 400);
        }

        // Create bet transaction
        await this.transactionRepository.createTransaction(-bet, 'Bet');

        // Generate random dice values
        const dice = rollDice();

        const result = checkCombination(dice);
        let winAmount = 0;

        // Process win if any
        if (result.multiplier > 0) {
            winAmount = bet * result.multiplier;
            await this.transactionRepository.createTransaction(winAmount, 'Win');
        }

        // Get updated balance
        const updatedBalance = await this.transactionRepository.getTotalBalance();

        return {
            dice,
            combination: result.name,
            multiplier: result.multiplier,
            win: winAmount,
            balance: updatedBalance
        };
    }
}