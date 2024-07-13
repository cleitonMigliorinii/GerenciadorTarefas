import { DisciplinaRepository } from "../../data/repository/DisciplinaRepository";
import { Disciplina } from "@prisma/client";

export class BuscarDisciplinaPorTurmaUseCase {

    constructor(private disciplinaRepository: DisciplinaRepository) { }

    async execute(codigoTurma: string): Promise<Disciplina[] | null> {
        try {

            return await this.disciplinaRepository.buscarDisciplinasPorTurma(codigoTurma)

        } catch (error) {
            throw new Error("Problema ao buscar disciplina")
        }
    }

}