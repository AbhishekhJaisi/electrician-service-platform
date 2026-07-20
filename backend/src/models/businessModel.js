const prisma = require("../lib/prisma");

const BusinessModel = {
  // There is always exactly one business row (id=1)
  find: ()          => prisma.business.findFirst(),
  update: (data)    => prisma.business.updateMany({ data }),
};

module.exports = BusinessModel;
