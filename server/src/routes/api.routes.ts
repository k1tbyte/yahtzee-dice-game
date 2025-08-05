import { Router } from 'express';
import { container } from 'tsyringe';
import { GameController } from '../controllers/game.controller';
import { TransactionController } from '../controllers/transaction.controller';

const router = Router();

const gameController = container.resolve(GameController);
const transactionController = container.resolve(TransactionController);

router.get('/init', (req, res, next) => gameController.initGame(req, res, next));
router.get('/balance', (req, res, next) => gameController.getBalance(req, res, next));
router.post('/roll', (req, res, next) => gameController.rollDice(req, res, next));
router.get('/multipliers', (req, res, next) => gameController.getMultipliers(req, res, next));
router.get('/transactions', (req, res, next) =>
    transactionController.getAllTransactions(req, res, next)
);
router.get('/health', (_, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())} seconds`
    });
});

export const apiRouter = router;