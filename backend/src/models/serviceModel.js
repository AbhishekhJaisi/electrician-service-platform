const prisma = require("../lib/prisma");

const ServiceModel = {
  findAll: ()      => prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
  findById: (id)   => prisma.service.findUnique({ where: { id: Number(id) } }),
  create: (data)   => prisma.service.create({ data }),
  update: (id, data) => prisma.service.update({ where: { id: Number(id) }, data }),
  remove: (id)     => prisma.service.delete({ where: { id: Number(id) } }),
};

module.exports = ServiceModel;
