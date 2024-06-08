

import { UUID } from "crypto";
import { IesRepository } from "../../data/repository/IesRepository";
import { IesUpdateDto } from "../../data/entity/Ies";
import { Ies } from "@prisma/client";

export class ListarTodasIesUseCase {

    constructor(private iesRepository: IesRepository) { }

    async execute(): Promise<Ies[] | null> {
        try {

            return await this.iesRepository.listarTodasIes()

        } catch (error) {
            throw new Error("Problema ao deletar IES")
        }
    }

}