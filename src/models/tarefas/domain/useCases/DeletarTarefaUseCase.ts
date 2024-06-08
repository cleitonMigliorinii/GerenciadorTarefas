import { TarefaRepository } from "../../data/repository/TarefaRepository";

export class DeletarTarefaUseCase {
    constructor(private tarefaRepository: TarefaRepository) {}

    execute(codigo: number): boolean {
        return this.tarefaRepository.deletar(codigo);
    }
}

