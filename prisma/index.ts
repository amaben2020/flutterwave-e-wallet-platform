import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// prevents reinstantiation after hot reloads in development. Make sure this is the only Prisma instance imported in other files to prevent reinstantiation which overloads Prisma.
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "info", "warn"],

    // datasources: {
    //   db: {
    //     url: String(process.env.DATABASE_URL),
    //   },
    // },
  });

console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);
if (process.env.NODE_ENV != "production") globalForPrisma.prisma;
