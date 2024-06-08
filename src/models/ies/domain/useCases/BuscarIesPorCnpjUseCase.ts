

import { UUID } from "crypto";
import { IesRepository } from "../../data/repository/IesRepository";
import { IesUpdateDto } from "../../data/entity/Ies";
import { Ies } from "@prisma/client";

export class BuscarIesPorCnpjUseCase{
 
    constructor(private iesRepository: IesRepository){}

    async execute(cnpj: string): Promise<Ies | null> {
        try {

            return await this.iesRepository.buscarIesPorCnpj(cnpj)

        } catch (error) {
            throw new Error("Problema ao deletar IES")
        }
    }

}