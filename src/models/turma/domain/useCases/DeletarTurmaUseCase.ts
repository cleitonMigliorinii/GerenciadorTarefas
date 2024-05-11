import { TurmaRepository } from "../../data/repository/turmaRepository"

export class DeleteUseCase{

    constructor(private turmaRepository: TurmaRepository){}

    async execute(codigo: string){
        try {
            await this.turmaRepository.deleteTurma(codigo)
        } catch (error) {
            throw new Error("Problema ao deletar TURMA")
        }
    }

}