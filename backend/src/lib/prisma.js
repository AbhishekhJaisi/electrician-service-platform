require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg }     = require("@prisma/adapter-pg");

function createClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  return new PrismaClient({ adapter });
}

// Reuse client across hot-reloads in development
const prisma = global._prisma ?? createClient();
if (process.env.NODE_ENV !== "production") global._prisma = prisma;

module.exports = prisma;
