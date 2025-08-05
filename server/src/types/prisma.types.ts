// Этот файл содержит типы для работы с Prisma
import { Prisma } from '@prisma/client';

export type TransactionType = 'Init' | 'Bet' | 'Win';

// Extending Prisma types to support our custom types
declare global {
  namespace PrismaJson {
    interface TransactionGetPayload extends Prisma.TransactionGetPayload<{}> {}
  }
}

export type PrismaTransaction = Prisma.TransactionGetPayload<{}>;
