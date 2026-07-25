/*
  Warnings:

  - You are about to drop the column `licenseFile` on the `Business` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "licenseFile";

-- CreateTable
CREATE TABLE "License" (
    "id" SERIAL NOT NULL,
    "businessId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
