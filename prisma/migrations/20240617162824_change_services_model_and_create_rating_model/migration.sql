/*
  Warnings:

  - Added the required column `created_at` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ratingId" INTEGER,
ADD COLUMN     "register" TEXT;

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "questions" TEXT[],

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE SET NULL ON UPDATE CASCADE;
