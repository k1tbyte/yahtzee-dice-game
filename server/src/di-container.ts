// Импортируем полифилы чтобы гарантировать загрузку reflect-metadata
import "./polyfills.js";

import { container } from 'tsyringe';
import { TransactionRepository } from './repositories/transaction.repository.js';
import { GameService } from './services/game.service.js';
import { TransactionService } from './services/transaction.service.js';

// Регистрируем классы в контейнере
export function registerDependencies() {
    // Регистрируем repositories
    container.register('TransactionRepository', {
        useClass: TransactionRepository
    });

    // Регистрируем сервисы
    container.register('GameService', {
        useClass: GameService
    });

    container.register('TransactionService', {
        useClass: TransactionService
    });

    return container;
}