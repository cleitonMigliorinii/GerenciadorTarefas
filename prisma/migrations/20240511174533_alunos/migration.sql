-- CreateTable
CREATE TABLE "Ies" (
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ies_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "aluno" (
    "RA" SERIAL NOT NULL,
    "nomeAluno" TEXT NOT NULL,
    "senhaAluno" TEXT NOT NULL,
    "emailAluno" TEXT NOT NULL,
    "telefoneAluno" TEXT NOT NULL,
    "tipoAluno" TEXT NOT NULL,
    "turmaAluno" TEXT NOT NULL,
    "dataCriacaoAluno" TIMESTAMP(3) NOT NULL,
    "situacaoAluno" TEXT NOT NULL,
    "dataAlteracaoAluno" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("RA")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ies_cnpj_key" ON "Ies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "aluno_emailAluno_key" ON "aluno"("emailAluno");
