import { TarefaRepository } from "../../data/repository/TarefaRepository";

export class BuscarTarefaPorDisciplinaUseCase {
    constructor(private tarefaRepository: TarefaRepository) {}

    execute(disciplinaId: number) {
        return this.tarefaRepository.buscarPorDisciplina(disciplinaId);
    }
}
