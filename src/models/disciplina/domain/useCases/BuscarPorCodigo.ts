import { DisciplinaRepository } from "../../data/repository/DisciplinaRepository";
import { Disciplina } from "@prisma/client";

export class BuscarDisciplinaPorCodigoUseCase {

    constructor(private disciplinaRepository: DisciplinaRepository) { }

    async execute(codigo: string): Promise<Disciplina | null> {
        try {

            return await this.disciplinaRepository.buscarDisciplinaPorCodigo(codigo)

        } catch (error) {
            throw new Error("Problema ao deletar disciplina")
        }
    }

}