const prisma = require("../lib/prisma");

const BookingModel = {
  create: (data) =>
    prisma.booking.create({ data }),

  findAll: () =>
    prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),

  findById: (id) =>
    prisma.booking.findUnique({
      where: {
        id: Number(id),
      },
    }),

  update: (id, data) =>
    prisma.booking.update({
      where: {
        id: Number(id),
      },
      data,
    }),
};

module.exports = BookingModel;