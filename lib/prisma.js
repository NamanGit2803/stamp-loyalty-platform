import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

// Ensure only one PrismaClient instance is created
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    log: ["error"],
  });
}

const prisma = globalForPrisma.prisma;

export default prisma;
