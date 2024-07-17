import { TarefaRepository } from "../../data/repository/TarefaRepository";
import { Tarefa } from "../../data/entity/Tarefa";

export class ListarTodasTarefasUseCase {
    constructor(private tarefaRepository: TarefaRepository) {}

    execute(): Promise<Tarefa[]> {
        return this.tarefaRepository.listarTodasTarefas();
    }
}