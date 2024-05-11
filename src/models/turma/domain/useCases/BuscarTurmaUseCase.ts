
import { Turma } from "@prisma/client";
import { TurmaRepository } from "../../data/repository/turmaRepository";

export class BuscaCodUseCase{

    constructor(private turmaRepository: TurmaRepository){}

    async execute(codigo: string): Promise<Turma | null>{
        try {
           return await this.turmaRepository.buscarTurmaPorCodigo(codigo)
        } catch (error) {
            throw new Error("Problema ao buscar IES")
        }
    }

}