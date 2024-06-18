-- CreateTable
CREATE TABLE "Attendant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Attendant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "register" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "id_attendant" INTEGER NOT NULL,
    "id_rating" INTEGER,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "questions" TEXT[],

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendant_email_key" ON "Attendant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Services_id_rating_key" ON "Services"("id_rating");

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_id_attendant_fkey" FOREIGN KEY ("id_attendant") REFERENCES "Attendant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_id_rating_fkey" FOREIGN KEY ("id_rating") REFERENCES "Rating"("id") ON DELETE SET NULL ON UPDATE CASCADE;
