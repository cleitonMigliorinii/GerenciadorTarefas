/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Ies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ies_cnpj_key" ON "Ies"("cnpj");
