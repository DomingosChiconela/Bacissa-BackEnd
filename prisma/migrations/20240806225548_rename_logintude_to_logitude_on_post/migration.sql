/*
  Warnings:

  - You are about to drop the column `longitude` on the `posts` table. All the data in the column will be lost.
  - Added the required column `logitude` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "longitude",
ADD COLUMN     "logitude" TEXT NOT NULL;
