/*
  Warnings:

  - You are about to drop the column `turmaUsuario` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `turmaID` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "turmaUsuario",
ADD COLUMN     "turmaID" TEXT NOT NULL;
