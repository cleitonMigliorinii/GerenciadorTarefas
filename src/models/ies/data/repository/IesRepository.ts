import { Ies } from "@prisma/client";
import { IesCriacaoDto } from "../entity/Ies";
import prisma from "../../../../config/database";



export interface IesRepositoryInterface{
    //nome(parametro:tipoParametro):retorno
    salvarIes(ies: IesCriacaoDto): Promise<Ies>
}

export class IesRepository implements IesRepositoryInterface{

    async salvarIes(ies: IesCriacaoDto): Promise<Ies>{
        
        try {
            
            const iesCriada = await prisma.ies.create({
                data: ies
            })

            return iesCriada

        } catch (error) {
            throw new Error('Falha ao salvar ies');
        }

    }

}