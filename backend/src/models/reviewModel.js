const prisma = require("../lib/prisma");

const ReviewModel = {
  findAll: ()        => prisma.review.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } }),
  findAllAdmin: ()   => prisma.review.findMany({ orderBy: { createdAt: "desc" } }),
  findById: (id)     => prisma.review.findUnique({ where: { id: Number(id) } }),
  create: (data)     => prisma.review.create({ data }),
  update: (id, data) => prisma.review.update({ where: { id: Number(id) }, data }),
  remove: (id)       => prisma.review.delete({ where: { id: Number(id) } }),
};

module.exports = ReviewModel;
