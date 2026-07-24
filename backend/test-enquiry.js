require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Prisma models available:", Object.keys(prisma).filter(k => !k.startsWith("_") && !k.startsWith("$")));

  try {
    const e = await prisma.enquiry.create({
      data: { name: "Test", phone: "1234567890", service: "Fan Installation" }
    });
    console.log("SUCCESS:", e);
  } catch (err) {
    console.error("FAIL:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
