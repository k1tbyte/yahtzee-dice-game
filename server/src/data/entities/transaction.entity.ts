import { type TransactionType } from '../../types/prisma.types';

// Transaction class for compatibility with existing code
// The actual schema is stored in prisma/schema.prisma
export class Transaction {
    id: number;
    value: number;
    type: TransactionType;
    timestamp: Date;

    constructor(partial?: Partial<Transaction>) {
        Object.assign(this, partial);
    }
}

export { type TransactionType } from '../../types/prisma.types';
