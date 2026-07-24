const prisma = require("../lib/prisma");

const BusinessModel = {
  find: ()       => prisma.business.findUnique({ where: { id: 1 } }),
  update: (data) => prisma.business.update({ where: { id: 1 }, data }),
};

module.exports = BusinessModel;
