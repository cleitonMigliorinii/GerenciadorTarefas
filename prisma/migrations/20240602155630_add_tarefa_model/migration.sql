-- CreateTable
CREATE TABLE "Tarefa" (
    "codigo" SERIAL NOT NULL,
    "disciplina" TEXT NOT NULL,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "situacao" TEXT NOT NULL,
    "data_alteracao" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_prevista" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("codigo")
);
