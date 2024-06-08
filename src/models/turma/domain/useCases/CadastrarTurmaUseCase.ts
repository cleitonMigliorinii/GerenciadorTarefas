import { TurmaCriacaoDto } from "../../data/entity/Turma";
import { TurmaRepository } from "../../data/repository/turmaRepository";

export class CadastrarTurmaUseCase{
    
    constructor(private turmaRepository: TurmaRepository){}

    async execute(turma: TurmaCriacaoDto){
        try{
            const turmaCriada = await this.turmaRepository.cadastrarTurma(turma);

            return turmaCriada;
        } catch (error){
            throw new Error("Problema ao Cadastrar Turma")
        }
    }
}



