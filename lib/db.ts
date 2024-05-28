// Suggested code may be subject to a license. Learn more: ~LicenseLog:2591320868.

import { PrismaClient } from '@prisma/client'
 declare global {
    var prisma: PrismaClient | undefined }



export const db = globalThis.prisma || new PrismaClient()
 if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

