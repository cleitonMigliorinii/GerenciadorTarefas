import { UUID } from "crypto";
import { IesCriacaoDto, IesUpdateDto } from "../../data/entity/Ies";
import { IesRepository } from "../../data/repository/IesRepository";
import { Ies } from "@prisma/client";

export class UpdateUseCase{

    constructor(private iesRepository: IesRepository){}

    async execute(codigo: string, iesUpdate: IesUpdateDto): Promise<Ies>{
        try {
            return await this.iesRepository.updateIes(codigo, iesUpdate)
        } catch (error) {
            throw new Error("Problema ao criar IES")
        }
    }

}