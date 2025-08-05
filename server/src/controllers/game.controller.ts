import { type Request, type Response,type NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { GameService } from '../services/game.service';
import { AppError } from '../utils/error/app-error';
import { getMultipliers } from "../utils/game-logic";

@injectable()
export class GameController {
    constructor(
        @inject(GameService) private gameService: GameService
    ) {}

    public async initGame(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.gameService.initializeGame();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getBalance(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const balance = await this.gameService.getBalance();
            res.status(200).json({ balance });
        } catch (error) {
            next(error);
        }
    }

    public async rollDice(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { bet } = req.body;

            if (!bet || bet <= 0) {
                throw AppError.badRequest('Invalid bet amount');
            }

            const result = await this.gameService.processRoll(bet);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    public getMultipliers(req: Request, res: Response, next: NextFunction): void {
        try {
            const multipliers = getMultipliers();

            const formattedMultipliers = {
                'Pair': multipliers.PAIR,
                '4+2': multipliers.FOUR_PLUS_TWO,
                'Yahtzee': multipliers.YAHTZEE,
                'Three Pairs': multipliers.THREE_PAIRS,
                'Other': multipliers.OTHER
            };

            res.status(200).json(formattedMultipliers);
        } catch (error) {
            next(error);
        }
    }
}