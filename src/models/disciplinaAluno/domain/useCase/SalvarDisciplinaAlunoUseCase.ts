import { DisciplinaAlunoCriacaoDto } from "../../data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../data/repository/disciplinaAlunoRepository";

export class SalvarDisciplinaAlunoUseCase{

    constructor(private disciplinaAlunoRepository: DisciplinaAlunoRepository){}

    async execute(disciplinaAluno: DisciplinaAlunoCriacaoDto){

        try {
            return await this.disciplinaAlunoRepository.salvarDisciplinaAluno(disciplinaAluno)
        } catch (error) {
            throw new Error("Problema ao vincular o aluno à disciplina.")
        }
    }
}
