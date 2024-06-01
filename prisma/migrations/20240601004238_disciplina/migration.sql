-- CreateTable
CREATE TABLE "Disciplina" (
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "professor" TEXT NOT NULL,
    "coordenador" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAlteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("codigo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_nome_key" ON "Disciplina"("nome");
