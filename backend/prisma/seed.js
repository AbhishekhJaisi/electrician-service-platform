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
        name:     "Sagar Electricals",
        owner:    "Sagar Sharma",
        tagline:  "Licensed electrician. Doorstep service across the tricity.",
        phone:    "+91 7086173493",
        whatsapp: "7086173493",
        email:    "abhishekhwayne@gmail.com",
        address:  "No. 4 Makum Pathar, Margherita, Assam, India – 786187",
        addressAs: "মাকুম পাথাৰ নং ৪, মাৰ্ঘেৰিটা চক্ৰ, তিনিচুকীয়া জিলা, অসম, ভাৰত – ৭৮৬১৮৭",
        shortLocation: "Margherita, Assam",
        hours:    "Mon–Sat, 8:00 AM – 9:00 PM · Emergency line 24/7",
        years:    3,
      },
    });
  }

  // ── Services ──
  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    await prisma.service.createMany({
      data: [
        { name: "House Wiring",         nameAs: "ঘৰৰ ৱায়াৰিং", desc: "Full or partial home rewiring, code-compliant.",    price: 2500, unit: "starting", time: "1–2 days",   icon: "Zap",           order: 1 },
        { name: "Fan Installation",     nameAs: "ফেন ইনষ্টলেচন", desc: "Ceiling, wall & exhaust fan fitting.",               price: 300,  unit: "per fan",  time: "30 min",     icon: "Fan",           order: 2 },
        { name: "Light Installation",   nameAs: "বাতি ইনষ্টলেচন", desc: "LED panels, chandeliers, outdoor lighting.",         price: 250,  unit: "per point",time: "30 min",     icon: "Lightbulb",     order: 3 },
        { name: "Switch Board Repair",  nameAs: "ছুইচ বৰ্ড মেৰামতি", desc: "Faulty boards, loose switches, sparking fixed.",     price: 200,  unit: "starting", time: "20 min",     icon: "Plug",          order: 4 },
        { name: "MCB Installation",     nameAs: "MCB ইনষ্টলেচন", desc: "Circuit breaker fitting & upgrades.",                price: 800,  unit: "per MCB",  time: "1 hour",     icon: "Power",         order: 5 },
        { name: "Short Circuit Repair", nameAs: "শ্বৰ্ট চাৰ্কিট মেৰামতি", desc: "Fast diagnosis, safe permanent fix.",                price: 500,  unit: "starting", time: "45 min",     icon: "AlertTriangle", order: 6 },
        { name: "Inverter Installation",nameAs: "ইনভাৰ্টাৰ ইনষ্টলেচন", desc: "Setup, wiring & battery connection.",                price: 1200, unit: "starting", time: "1–2 hours",  icon: "Zap",           order: 7 },
        { name: "AC Power Point",       nameAs: "AC পাৱাৰ পইণ্ট", desc: "Dedicated points for split & window AC.",            price: 900,  unit: "per point",time: "1 hour",     icon: "Wind",          order: 8 },
        { name: "Geyser Installation",  nameAs: "গিজাৰ ইনষ্টলেচন", desc: "Safe fitting with dedicated MCB.",                   price: 600,  unit: "starting", time: "1 hour",     icon: "Flame",         order: 9 },
      ],
    });
  }

  // ── Reviews ──
  const reviewCount = await prisma.review.count();
  if (reviewCount === 0) {
    await prisma.review.createMany({
      data: [
        { name: "Deep Jaisi",    area: "Margherita",   rating: 5, text: "Wow",                         date: "25/07/2026" },
        { name: "Abhishek",      area: "Margherita",   rating: 5, text: "Great!",                       date: "25/07/2026" },
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
