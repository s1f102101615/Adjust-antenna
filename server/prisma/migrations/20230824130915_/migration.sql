/*
  Warnings:

  - Added the required column `details` to the `Calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calendar" ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;
