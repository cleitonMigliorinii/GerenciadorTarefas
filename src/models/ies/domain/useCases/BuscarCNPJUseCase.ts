import { Ies } from "@prisma/client";
import { IesCriacaoDto } from "../../data/entity/Ies";
import { IesRepository } from "../../data/repository/IesRepository";

export class BuscarCNPJUseCase{

    constructor(private iesRepository: IesRepository){}

    async execute(cnpj: string): Promise<Ies | null>{
        try {
            return await this.iesRepository.buscarIesPorCNPJ(cnpj)
        } catch (error) {
            throw new Error("Problema ao buscar IES")
        }
    }

}