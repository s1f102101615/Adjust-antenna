/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Calendar` table. All the data in the column will be lost.
  - Added the required column `created` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "createdAt",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL;
