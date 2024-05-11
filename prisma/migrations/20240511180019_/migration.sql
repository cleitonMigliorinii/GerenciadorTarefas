/*
  Warnings:

  - You are about to drop the `aluno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "aluno";

-- CreateTable
CREATE TABLE "usuario" (
    "RA" INTEGER NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "senhaUsuario" TEXT NOT NULL,
    "emailUsuario" TEXT NOT NULL,
    "telefoneUsuario" TEXT NOT NULL,
    "tipoUsuario" TEXT NOT NULL,
    "turmaUsuario" TEXT NOT NULL,
    "dataCriacaoUsuario" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "situacaoUsuario" TEXT NOT NULL,
    "dataAlteracaoUsuario" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("RA")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_emailUsuario_key" ON "usuario"("emailUsuario");
