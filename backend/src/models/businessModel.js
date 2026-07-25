const prisma = require("../lib/prisma");

const BusinessModel = {
  find: ()       => prisma.business.findUnique({ where: { id: 1 } }),
  update: async (data) => {
    const existing = await prisma.business.findUnique({ where: { id: 1 } });
    if (existing) {
      return prisma.business.update({ where: { id: 1 }, data });
    }
    const defaults = {
      name: "Sagar Electricals",
      owner: "Sagar Sharma",
      tagline: "Licensed electrician. Doorstep service across the tricity.",
      phone: "+91 7086173493",
      whatsapp: "7086173493",
      email: "abhishekhwayne@gmail.com",
      address: "SCO 41, Phase 7, Sector 61, Mohali, Punjab",
      hours: "Mon–Sat, 8:00 AM – 9:00 PM · Emergency line 24/7",
      years: 3,
    };
    return prisma.business.create({ data: { id: 1, ...defaults, ...data } });
  },
};

module.exports = BusinessModel;
