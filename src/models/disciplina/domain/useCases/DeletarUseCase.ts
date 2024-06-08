import { UUID } from "crypto";
import { DisciplinaRepository } from "../../data/repository/DisciplinaRepository";

export class DeletarDisciplinaUseCase {

    constructor(private disciplinaRepository: DisciplinaRepository) { }

    async execute(codigo: string) {
        try {

            await this.disciplinaRepository.deletarDisciplina(codigo)

        } catch (error) {
            throw new Error("Problema ao deletar disciplina")
        }
    }

}