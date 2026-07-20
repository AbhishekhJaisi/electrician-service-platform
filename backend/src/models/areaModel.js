const prisma = require("../lib/prisma");

const AreaModel = {
  findAll: ()        => prisma.area.findMany({ orderBy: { order: "asc" } }),
  create: (data)     => prisma.area.create({ data }),
  update: (id, data) => prisma.area.update({ where: { id: Number(id) }, data }),
  remove: (id)       => prisma.area.delete({ where: { id: Number(id) } }),
};

module.exports = AreaModel;
