import { Turma } from "@prisma/client";
import { TurmaRepository } from "../../data/repository/turmaRepository";

export class BuscarTurmaPorIESUseCase{

    constructor(private turmaRepository: TurmaRepository){}

    async execute(iesCodigo: string): Promise<Turma[] | null>{
        try {
           return await this.turmaRepository.buscarTurmaPorIES(iesCodigo)
        } catch (error) {
            throw new Error("Problema ao buscar IES")
        }
    }

}