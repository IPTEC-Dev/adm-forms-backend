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

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendant_email_key" ON "Attendant"("email");

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_id_fkey" FOREIGN KEY ("id") REFERENCES "Attendant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
