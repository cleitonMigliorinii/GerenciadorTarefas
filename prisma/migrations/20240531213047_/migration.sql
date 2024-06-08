/*
  Warnings:

  - Changed the type of `situacaoUsuario` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "situacaoUsuario",
ADD COLUMN     "situacaoUsuario" BOOLEAN NOT NULL;
