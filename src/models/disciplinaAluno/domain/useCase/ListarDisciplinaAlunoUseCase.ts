import { DisciplinaAluno } from "@prisma/client";
import { DisciplinaAlunoRepository } from "../../data/repository/disciplinaAlunoRepository";

export class ListarDisciplinaAlunoUseCase {
    constructor(private disciplinaAlunoRepository: DisciplinaAlunoRepository){}

    async execute(): Promise<DisciplinaAluno[] | null>{
        try {
            return await this.disciplinaAlunoRepository.listarDisciplinaAluno
        } catch (error) {
            throw new Error('Problema durante a listagem das disciplinas dos alunos')
        }
    }
}