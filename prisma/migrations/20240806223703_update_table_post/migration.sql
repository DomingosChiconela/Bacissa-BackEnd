/*
  Warnings:

  - You are about to drop the column `wasteId` on the `posts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[residueId]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `residueId` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_wasteId_fkey";

-- DropIndex
DROP INDEX "posts_wasteId_key";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "wasteId",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "residueId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "posts_residueId_key" ON "posts"("residueId");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_residueId_fkey" FOREIGN KEY ("residueId") REFERENCES "residues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
