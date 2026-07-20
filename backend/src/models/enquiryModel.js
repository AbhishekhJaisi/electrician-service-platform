const prisma = require("../lib/prisma");

const EnquiryModel = {
  create: (data)        => prisma.enquiry.create({ data }),
  findAll: ()           => prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } }),
  findById: (id)        => prisma.enquiry.findUnique({ where: { id: Number(id) } }),
  updateStatus: (id, status) =>
    prisma.enquiry.update({ where: { id: Number(id) }, data: { status } }),
};

module.exports = EnquiryModel;
