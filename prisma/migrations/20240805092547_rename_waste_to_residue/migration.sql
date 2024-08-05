/*
  Warnings:

  - You are about to drop the `Waste` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_wasteId_fkey";

-- DropTable
DROP TABLE "Waste";

-- CreateTable
CREATE TABLE "residues" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "residues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "residues_name_key" ON "residues"("name");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_wasteId_fkey" FOREIGN KEY ("wasteId") REFERENCES "residues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
