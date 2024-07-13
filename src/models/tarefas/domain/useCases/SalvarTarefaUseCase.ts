import { TarefaRepository } from "../../data/repository/TarefaRepository";
import { Tarefa, TarefaCriacaoDto } from "../../data/entity/Tarefa";

export class SalvarTarefaUseCase {
    constructor(private tarefaRepository: TarefaRepository) {}

    execute(tarefaDto: TarefaCriacaoDto): Tarefa {
        return this.tarefaRepository.salvar(tarefaDto);
    }
}

