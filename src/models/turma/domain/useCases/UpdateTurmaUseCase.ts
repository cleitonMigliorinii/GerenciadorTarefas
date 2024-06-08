import { TurmaUpdateDto } from "../../data/entity/Turma";
import { Turma } from "@prisma/client";
import { TurmaRepository } from "../../data/repository/turmaRepository";

export class UpdateTurmaUseCase{

    constructor(private turmaRepository: TurmaRepository){}

    async execute(codigo: string, turmaUpdate: TurmaUpdateDto): Promise<Turma>{
        try {
            return await this.turmaRepository.updateTurma(codigo, turmaUpdate)
        } catch (error) {
            throw new Error("Problema ao criar TURMA")
        }
    }

}