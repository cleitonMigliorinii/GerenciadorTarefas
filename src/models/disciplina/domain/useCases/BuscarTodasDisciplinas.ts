import { DisciplinaRepository } from "../../data/repository/DisciplinaRepository";
import { Disciplina } from "@prisma/client";

export class BuscarTodasDisciplinasUseCase {

    constructor(private disciplinaRepository: DisciplinaRepository) { }

    async execute(): Promise<Disciplina[] | null> {
        try {

            return await this.disciplinaRepository.buscarTodasDisciplinas()

        } catch (error) {
            throw new Error("Problema ao buscar disciplinas")
        }
    }

}