
import { DisciplinaAluno } from "@prisma/client";
import { DisciplinaAlunoRepository } from "../../data/repository/disciplinaAlunoRepository";

export class BuscarDisciplinaAlunoPorDisciplinaUseCase{

    constructor(private disciplinaAlunoRepository: DisciplinaAlunoRepository){}

    async execute(codigoDisciplina: string): Promise<DisciplinaAluno[] | null>{
        try {
            return await this.disciplinaAlunoRepository.buscarDisciplinaAlunoPorDisciplina(codigoDisciplina)
        } catch (error) {
            throw new Error("Erro ao buscar Disciplina.")
        }
    }
}
