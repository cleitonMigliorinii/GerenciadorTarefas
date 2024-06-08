/*
  Warnings:

  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "usuario";

-- CreateTable
CREATE TABLE "Usuario" (
    "RA" TEXT NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "senhaUsuario" TEXT NOT NULL,
    "emailUsuario" TEXT NOT NULL,
    "telefoneUsuario" TEXT NOT NULL,
    "tipoUsuario" TEXT NOT NULL,
    "turmaUsuario" TEXT NOT NULL,
    "dataCriacaoUsuario" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "situacaoUsuario" TEXT NOT NULL,
    "dataAlteracaoUsuario" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("RA")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_emailUsuario_key" ON "Usuario"("emailUsuario");
