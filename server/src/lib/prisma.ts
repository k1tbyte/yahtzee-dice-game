import { PrismaClient } from '@prisma/client'

// Create a global variable to avoid creating multiple connections in development mode
declare global {
  // eslint-disable-next-line no-var
  // noinspection ES6ConvertVarToLetConst
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
