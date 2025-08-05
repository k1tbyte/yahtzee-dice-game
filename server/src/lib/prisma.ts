// Этот файл экспортирует единый экземпляр PrismaClient для всего приложения
import { PrismaClient } from '@prisma/client'

// Создаем глобальную переменную, чтобы не создавать множественные соединения в режиме разработки
declare global {
  // eslint-disable-next-line no-var
  // noinspection ES6ConvertVarToLetConst
  var prisma: PrismaClient | undefined
}

// Экспортируем PrismaClient
export const prisma = global.prisma || new PrismaClient()

// В режиме разработки сохраняем в глобальной переменной для избежания множественных подключений
if (process.env.NODE_ENV !== 'production') global.prisma = prisma
