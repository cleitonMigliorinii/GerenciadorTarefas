
import { DisciplinaAluno } from "@prisma/client";
import { DisciplinaAlunoRepository } from "../../data/repository/disciplinaAlunoRepository";

export class BuscarDisciplinaAlunoPorAlunoUseCase{

    constructor(private disciplinaAlunoRepository: DisciplinaAlunoRepository){}

    async execute(codigoAluno: string): Promise<DisciplinaAluno[] | null>{
        try {
            return await this.disciplinaAlunoRepository.buscarDisciplinaAlunoPorAluno(codigoAluno)
        } catch (error) {
            throw new Error("Erro ao buscar Aluno.")
        }
    }
}
