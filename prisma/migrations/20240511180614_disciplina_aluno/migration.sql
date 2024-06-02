-- CreateTable
CREATE TABLE "DisciplinaAluno" (
    "codigo" TEXT NOT NULL,
    "codigoAluno" TEXT NOT NULL,
    "codigoDisciplina" TEXT NOT NULL,
    "dataRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "situacao" TEXT NOT NULL,

    CONSTRAINT "DisciplinaAluno_pkey" PRIMARY KEY ("codigo")
);
