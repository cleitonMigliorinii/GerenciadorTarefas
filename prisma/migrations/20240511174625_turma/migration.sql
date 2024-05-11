-- CreateTable
CREATE TABLE "Turma" (
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataInicioPeriodo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFinalPeriodo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codigoIes" TEXT NOT NULL,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("codigo")
);
