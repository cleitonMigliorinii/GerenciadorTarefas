import { Ies } from "@prisma/client";
import { IesCriacaoDto, IesUpdateDto } from "../entity/Ies";
import prisma from "../../../../config/dataBase";



export interface IesRepositoryInterface{

    salvarIes(ies: IesCriacaoDto): Promise<Ies>
}

export class IesRepository implements IesRepositoryInterface {
    

    async salvarIes(ies: IesCriacaoDto): Promise<Ies> {
        
        try {
            
            const iesCriada = await prisma.ies.create({
                data: ies
            })
            return iesCriada

        } catch (error) {
            throw new Error("Falaha ao criar Ies");
            
        }
    }

    async buscarIesPorCodigo(codigo: string): Promise<Ies | null> {

        try {
            return await prisma.ies.findUnique({
                where: {codigo}
            })
        } catch (error) {
            throw new Error("Problema ao buscar ies");
            
        }

    }

    async buscarIesPorCNPJ(cnpj: string): Promise<Ies | null> {

        try {
            return await prisma.ies.findUnique({
                where: {cnpj}
            })
        } catch (error) {
            throw new Error("Problema ao buscar ies");
            
        }

    }

    async updateIes(codigo: string, ies: IesUpdateDto): Promise<Ies> {

        try {
            return await prisma.ies.update({
                where: {codigo},
                data: ies
            })
        } catch (error) {
            throw new Error("Problema ao alterar ies");
            
        }

    }

    async deleteIes(codigo: string): Promise<void> {

        try {
            await prisma.ies.delete({
                where: {codigo},
            })
        } catch (error) {
            throw new Error("Problema ao deletar ies");
            
        }

    }
}