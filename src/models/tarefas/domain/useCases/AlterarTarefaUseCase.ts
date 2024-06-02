import { TarefaRepository } from "../../data/repository/TarefaRepository";
import { Tarefa, TarefaUpdateDto } from "../../data/entity/Tarefa";

export class AlterarTarefaUseCase {
    constructor(private tarefaRepository: TarefaRepository) {}

    execute(codigo: number, tarefaAtualizada: TarefaUpdateDto): Tarefa | null {
        return this.tarefaRepository.alterar(codigo, tarefaAtualizada);
    }
}

