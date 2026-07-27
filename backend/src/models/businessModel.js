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
      address: "No. 4 Makum Pathar, Margherita, Tinsukia, Assam, India - 786187",
      addressAs: "মাকুম পাথাৰ নং ৪, মাৰ্ঘেৰিটা চক্ৰ, তিনিচুকীয়া জিলা, অসম, ভাৰত – ৭৮৬১৮৭",
      hours: "Mon–Sat, 8:00 AM – 9:00 PM",
      years: 3,
      radius: 15,
      map: "https://www.google.com/maps?q=Margherita,Assam&z=14&output=embed",
      shortLocation: "Margherita, Assam",
    };
    return prisma.business.create({ data: { id: 1, ...defaults, ...data } });
  },
};

module.exports = BusinessModel;
