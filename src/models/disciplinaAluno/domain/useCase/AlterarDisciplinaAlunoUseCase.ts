import { DisciplinaAluno } from "@prisma/client";
import { DisciplinaAlunoUpdateDto } from "../../data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../data/repository/disciplinaAlunoRepository";

export class AlterarDisciplinaAlunoUseCase{

    constructor(private disciplinaAlunoRepository: DisciplinaAlunoRepository){}

    async execute(codigo: string, disciplinaAlunoUpdate: DisciplinaAlunoUpdateDto): Promise<DisciplinaAluno>{
        try {
            return await this.disciplinaAlunoRepository.alterarDisciplinaAluno(codigo, disciplinaAlunoUpdate)
        } catch (error) {
            throw new Error("Problema ao editar vínculo aluno-disciplina")            
        }
    }
}
