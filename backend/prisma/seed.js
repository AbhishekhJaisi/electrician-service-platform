const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ── Admin (default password: admin123 — change after first login) ──
  const hash = await bcrypt.hash("admin123", 12);
  await prisma.admin.upsert({
    where:  { username: "admin" },
    update: {},
    create: { username: "admin", password: hash },
  });

  // ── Business info ──
  const existingBusiness = await prisma.business.findFirst();
  if (!existingBusiness) {
    await prisma.business.create({
      data: {
        name:     "VoltFix Electrical",
        owner:    "Ranjit Singh",
        tagline:  "Licensed electrician. Doorstep service across the tricity.",
        phone:    "+91 98765 43210",
        whatsapp: "919876543210",
        email:    "contact@voltfix.example",
        address:  "SCO 41, Phase 7, Sector 61, Mohali, Punjab",
        hours:    "Mon–Sat, 8:00 AM – 9:00 PM · Emergency line 24/7",
        years:    12,
      },
    });
  }

  // ── Services ──
  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    await prisma.service.createMany({
      data: [
        { name: "House Wiring",         desc: "Full or partial home rewiring, code-compliant.",    price: 2500, unit: "starting", time: "1–2 days",   icon: "Zap",           order: 1 },
        { name: "Fan Installation",     desc: "Ceiling, wall & exhaust fan fitting.",               price: 300,  unit: "per fan",  time: "30 min",     icon: "Fan",           order: 2 },
        { name: "Light Installation",   desc: "LED panels, chandeliers, outdoor lighting.",         price: 250,  unit: "per point",time: "30 min",     icon: "Lightbulb",     order: 3 },
        { name: "Switch Board Repair",  desc: "Faulty boards, loose switches, sparking fixed.",     price: 200,  unit: "starting", time: "20 min",     icon: "Plug",          order: 4 },
        { name: "MCB Installation",     desc: "Circuit breaker fitting & upgrades.",                price: 800,  unit: "per MCB",  time: "1 hour",     icon: "Power",         order: 5 },
        { name: "Short Circuit Repair", desc: "Fast diagnosis, safe permanent fix.",                price: 500,  unit: "starting", time: "45 min",     icon: "AlertTriangle", order: 6 },
        { name: "Inverter Installation",desc: "Setup, wiring & battery connection.",                price: 1200, unit: "starting", time: "1–2 hours",  icon: "Zap",           order: 7 },
        { name: "AC Power Point",       desc: "Dedicated points for split & window AC.",            price: 900,  unit: "per point",time: "1 hour",     icon: "Wind",          order: 8 },
        { name: "Geyser Installation",  desc: "Safe fitting with dedicated MCB.",                   price: 600,  unit: "starting", time: "1 hour",     icon: "Flame",         order: 9 },
      ],
    });
  }

  // ── Reviews ──
  const reviewCount = await prisma.review.count();
  if (reviewCount === 0) {
    await prisma.review.createMany({
      data: [
        { name: "Priya Malhotra", area: "Sector 34, Chandigarh", rating: 5, text: "Fixed a short circuit at 10pm the same night I called. Genuinely reliable.", date: "2 weeks ago" },
        { name: "Harpreet Sidhu", area: "Kharar",                rating: 5, text: "Rewired our whole ground floor. Neat work, fair price, no surprises.",         date: "1 month ago" },
        { name: "Anil Kapoor",    area: "Zirakpur",              rating: 4, text: "Prompt and polite. Slightly later than quoted but the work was solid.",         date: "1 month ago" },
      ],
    });
  }

  // ── Areas ──
  const areaCount = await prisma.area.count();
  if (areaCount === 0) {
    await prisma.area.createMany({
      data: [
        { name: "Chandigarh", order: 1 },
        { name: "Mohali",     order: 2 },
        { name: "Panchkula",  order: 3 },
        { name: "Kharar",     order: 4 },
        { name: "Zirakpur",   order: 5 },
      ],
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
