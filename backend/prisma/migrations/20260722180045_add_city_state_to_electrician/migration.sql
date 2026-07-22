/*
  Warnings:

  - Added the required column `city` to the `Electrician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Electrician` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Electrician` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;
