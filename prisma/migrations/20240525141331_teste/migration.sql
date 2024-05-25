-- CreateTable
CREATE TABLE "Turma" (
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataInicioPeriodo" TIMESTAMP(3) NOT NULL,
    "dataFinalPeriodo" TIMESTAMP(3) NOT NULL,
    "codigoIes" TEXT NOT NULL,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("codigo")
);
