import "./polyfills";

import { container } from 'tsyringe';
import { TransactionRepository } from './repositories/transaction.repository';
import { GameService } from './services/game.service';

export function registerDependencies() {
    container.registerSingleton(TransactionRepository);
    container.registerSingleton(GameService);
    return container;
}