import { type Request, type Response,type NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { GameService } from '../services/game.service';
import { AppError } from '../utils/error/app-error';

@injectable()
export class GameController {
    constructor(
        @inject('GameService') private gameService: GameService
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
}