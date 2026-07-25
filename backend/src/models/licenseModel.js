const prisma = require("../lib/prisma");

const LicenseModel = {
  findByBusiness: (businessId) =>
    prisma.license.findMany({ where: { businessId } }),
  create: (data) => prisma.license.create({ data }),
  remove: (id, businessId) =>
    prisma.license.delete({ where: { id, businessId } }),
};

module.exports = LicenseModel;
