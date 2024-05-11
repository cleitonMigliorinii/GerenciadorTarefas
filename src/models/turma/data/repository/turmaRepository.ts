
import { Turma } from "@prisma/client";
import prisma from "../../../../config/dataBase";
import { TurmaCriacaoDto, TurmaUpdateDto } from "../entity/Turma";



export interface TurmaRepositoryInterface{

    salvarTurma(ies: TurmaCriacaoDto): Promise<Turma>
}

export class TurmaRepository implements TurmaRepositoryInterface {
    

    async salvarTurma(turma: TurmaCriacaoDto): Promise<Turma> {
        
        try {
            
            const turmaCriada = await prisma.turma.create({
                data: turma
            })
            return turmaCriada

        } catch (error) {
            throw new Error("Falaha ao criar Ies");
            
        }
    }

    async buscarTurmaPorCodigo(codigo: string): Promise <Turma | null> {

        try {
            return await prisma.turma.findUnique({
                where: {codigo}
            })
            
            
        } catch (error) {
            

            throw new Error("Problema ao buscar turma");
        }

    }

    

    async updateTurma(codigo: string, turma: TurmaUpdateDto): Promise<Turma> {

        try {
            return await prisma.turma.update({
                where: {codigo},
                data: turma
            })
        } catch (error) {
            throw new Error("Problema ao alterar ies");
            
        }

    }

    async deleteTurma(codigo: string): Promise<void> {

        try {
            await prisma.turma.delete({
                where: {codigo},
            })
        } catch (error) {
            throw new Error("Problema ao deletar turma");
            
        }

    }
}