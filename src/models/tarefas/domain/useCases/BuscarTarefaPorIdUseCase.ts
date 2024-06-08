import { TarefaRepository } from "../../data/repository/TarefaRepository";

export class BuscarTarefaPorIdUseCase {
    constructor(private tarefaRepository: TarefaRepository) {}

    execute(codigo: number) {
        return this.tarefaRepository.buscarPorId(codigo);
    }
}

