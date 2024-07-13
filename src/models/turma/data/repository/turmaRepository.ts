
import { Turma } from "@prisma/client";
import prisma from "../../../../config/database";
import { TurmaCriacaoDto, TurmaUpdateDto } from "../entity/Turma";

export interface TurmaRepositoryInterface{

    cadastrarTurma(turma: TurmaCriacaoDto): Promise<Turma>
}

export class TurmaRepository implements TurmaRepositoryInterface {
    

    async cadastrarTurma(turma: TurmaCriacaoDto): Promise<Turma> {
        
        try {
            
            const turmaCriada = await prisma.turma.create({
                data: turma
            })
            return turmaCriada

        } catch (error) {
            console.log(error)
            throw new Error("Falha ao criar Turma");
            
        }
    }

    async buscarTurmaPorCodigo(codigo: string): Promise <Turma | null> {

        try {
            return await prisma.turma.findUnique({
                where: {codigo},
                include: {
                    ies: {
                        select: {
                            nome: true
                        }
                    }
                }
            })
            
        } catch (error) {
            

            throw new Error("Problema ao buscar turma");
        }

    }

    
    async buscarTodasTurmas(): Promise <Turma[] | null> {

        try {
            return await prisma.turma.findMany({ 
            })
            
        } catch (error) {
            

            throw new Error("Problema ao buscar turma");
        }

    }

    async buscarTurmaPorIES(iesCodigo: string): Promise <Turma[] | null> {
        try {
            return await prisma.turma.findMany({
                where: {iesCodigo},
                include: {
                    ies:true 
                }
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
            throw new Error("Problema ao alterar Turma");
            
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