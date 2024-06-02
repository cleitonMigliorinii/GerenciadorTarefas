import { DisciplinaAlunoRepository } from "../../data/repository/disciplinaAlunoRepository";

export class DeletarDisciplinaAlunoUseCase{

    constructor(private disciplinaAlunoRepository: DisciplinaAlunoRepository){}

    async execute(codigo: string){
        try {
            await this.disciplinaAlunoRepository.deletarDisciplinaAluno(codigo)
        } catch (error) {
            throw new Error("Erro ao excluir vínculo aluno-disciplina.")
        }
    }
}