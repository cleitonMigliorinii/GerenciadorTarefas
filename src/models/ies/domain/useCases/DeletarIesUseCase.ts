import { UUID } from "crypto";
import { IesRepository } from "../../data/repository/IesRepository";

export class DeletarIesUseCase{

    constructor(private iesRepository: IesRepository){}

    async execute(codigo: string){
        try {

            await this.iesRepository.deletarIes(codigo)

        } catch (error) {
            throw new Error("Problema ao deletar IES")
        }
    }

}