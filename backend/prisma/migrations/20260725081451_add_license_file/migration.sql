-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "licenseFile" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "ownerPhoto" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "caption" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);
