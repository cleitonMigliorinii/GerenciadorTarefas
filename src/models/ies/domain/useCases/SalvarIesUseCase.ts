import { IesCriacaoDto } from "../../data/entity/Ies";
import { IesRepository } from "../../data/repository/IesRepository";

export class SalvarIesUseCase{

    constructor(private iesRepository: IesRepository){

    }
    
    async execute(ies: IesCriacaoDto){
        try {
            
            const iesCriada = await this.iesRepository.salvarIes(ies);

            return iesCriada;

        } catch (error) {
            throw new Error("Problema ao criar Ies");
            
        }
    }

}