const prisma = require("../lib/prisma");

const LicenseModel = {
  findByBusiness: (businessId) =>
    prisma.license.findMany({ where: { businessId: Number(businessId) } }),
  create: (data) => prisma.license.create({ data }),
  remove: (id, _businessId) =>
    prisma.license.delete({ where: { id: Number(id) } }),
};

module.exports = LicenseModel;

