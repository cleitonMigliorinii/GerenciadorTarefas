import { Turma } from "@prisma/client";
import { TurmaRepository } from "../../data/repository/turmaRepository";

export class BuscarTodasTurmasUseCAse{

    constructor(private turmaRepository: TurmaRepository){}

    async execute(): Promise<Turma[] | null>{
        try {
           return await this.turmaRepository.buscarTodasTurmas()
        } catch (error) {
            throw new Error("Problema ao buscar IES")
        }
    }

}