const prisma = require("../lib/prisma");

const GalleryModel = {
  findAll: () =>
    prisma.galleryImage.findMany({
      orderBy: { order: "asc" },
    }),

  create: (data) =>
    prisma.galleryImage.create({ data }),

  delete: (id) =>
    prisma.galleryImage.delete({
      where: { id: Number(id) },
    }),

  updateOrder: (id, order) =>
    prisma.galleryImage.update({
      where: { id: Number(id) },
      data: { order },
    }),
};

module.exports = GalleryModel;
