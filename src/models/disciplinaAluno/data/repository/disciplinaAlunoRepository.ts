import { DisciplinaAluno } from "@prisma/client";
import { DisciplinaAlunoCriacaoDto, DisciplinaAlunoUpdateDto } from "../entity/disciplinaAluno";
import prisma from "../../../../config/database";


export interface DisciplinaAlunoRepositoryInterface {

    salvarDisciplinaAluno(disciplinaAluno: DisciplinaAlunoCriacaoDto): Promise<DisciplinaAluno>

}
export class DisciplinaAlunoRepository implements DisciplinaAlunoRepositoryInterface {

    async salvarDisciplinaAluno(disciplinaAluno: DisciplinaAlunoCriacaoDto): Promise<DisciplinaAluno>{
        try {
            const disciplinaAlunoCriada = await prisma.disciplinaAluno.create({
                data: disciplinaAluno
            })

            return disciplinaAlunoCriada
        } catch (error) {
            throw new Error('Erro ao incluir aluno na disciplina');          
        }
    }

    async buscarDisciplinaAlunoPorAluno(codigoAluno:string): Promise<DisciplinaAluno[] | null>{
        try {
            return await prisma.disciplinaAluno.findMany({
                where: {codigoAluno}
            })
        } catch (error) {
            throw new Error('Problema em localizar as disciplinas do aluno')
        }
    }

    async buscarDisciplinaAlunoPorDisciplina(codigoDisciplina:string): Promise<DisciplinaAluno[] | null>{
        try {
            return await prisma.disciplinaAluno.findMany({
                where: {codigoDisciplina}
            })
        } catch (error) {
            throw new Error('Problema em localizar os alunos da disciplina')
        }
    }

    async alterarDisciplinaAluno(codigo: string, disciplinaAluno: DisciplinaAlunoUpdateDto): Promise<DisciplinaAluno>{
        try{
            return await prisma.disciplinaAluno.update({
                where: {codigo},
                data: disciplinaAluno
            })
        }catch(error){
            throw new Error("Problema ao alterar a situação")
        }
    }

    async deletarDisciplinaAluno(codigo: string): Promise<void>{
        try{
            await prisma.disciplinaAluno.delete({
                where: {codigo}
            })
        }catch(error){
            throw new Error("Problema ao remover aluno da disciplina")
        }
    }
}
