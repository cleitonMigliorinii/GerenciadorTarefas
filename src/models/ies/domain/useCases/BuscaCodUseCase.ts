import { UUID } from "crypto";
import { IesCriacaoDto } from "../../data/entity/Ies";
import { IesRepository } from "../../data/repository/IesRepository";
import { Ies } from "@prisma/client";

export class BuscaCodUseCase{

    constructor(private iesRepository: IesRepository){}

    async execute(codigo: UUID): Promise<Ies | null>{
        try {
           return await this.iesRepository.buscarIesPorCodigo(codigo)
        } catch (error) {
            throw new Error("Problema ao buscar IES")
        }
    }

}