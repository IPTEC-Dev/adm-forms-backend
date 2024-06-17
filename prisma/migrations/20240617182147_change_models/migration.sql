/*
  Warnings:

  - You are about to drop the column `ratingId` on the `Services` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_rating]` on the table `Services` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_attendant` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_id_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_ratingId_fkey";

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "ratingId",
ADD COLUMN     "id_attendant" INTEGER NOT NULL,
ADD COLUMN     "id_rating" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Services_id_rating_key" ON "Services"("id_rating");

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_id_attendant_fkey" FOREIGN KEY ("id_attendant") REFERENCES "Attendant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_id_rating_fkey" FOREIGN KEY ("id_rating") REFERENCES "Rating"("id") ON DELETE SET NULL ON UPDATE CASCADE;
