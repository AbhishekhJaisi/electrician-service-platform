-- AlterTable: add Cloudinary URL column to GalleryImage
ALTER TABLE "GalleryImage" ADD COLUMN "url" TEXT NOT NULL DEFAULT '';
