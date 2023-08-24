/*
  Warnings:

  - You are about to drop the column `created` on the `Calendar` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "created",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
