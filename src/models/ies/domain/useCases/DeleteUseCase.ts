import { UUID } from "crypto";
import { IesCriacaoDto } from "../../data/entity/Ies";
import { IesRepository } from "../../data/repository/IesRepository";

export class DeleteUseCase{

    constructor(private iesRepository: IesRepository){}

    async execute(codigo: string){
        try {
            await this.iesRepository.deleteIes(codigo)
        } catch (error) {
            throw new Error("Problema ao deletar IES")
        }
    }

}