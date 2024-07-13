
import { DisciplinaRepository } from "../../data/repository/DisciplinaRepository";
import { Disciplina } from "@prisma/client";
import { DisciplinaUpdateDto } from "../../data/entity/Disciplina";

export class AlterarDisciplinaUseCase {

    constructor(private disciplinaRepository: DisciplinaRepository) { }

    async execute(nome: string, disciplinaUpdate: DisciplinaUpdateDto): Promise<Disciplina> {
        try {

            return await this.disciplinaRepository.alterarDisciplina(nome, disciplinaUpdate)

        } catch (error) {
            throw new Error("Problema ao alterar disciplina")
        }
    }

}