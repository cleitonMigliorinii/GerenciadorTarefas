import { Tarefa, TarefaCriacaoDto, TarefaUpdateDto } from "../entity/Tarefa";

export class TarefaRepository {
    private tarefas: Tarefa[] = [];

    salvar(tarefaDto: TarefaCriacaoDto): Tarefa {
        const tarefa: Tarefa = {
            ...tarefaDto,
            codigo: this.tarefas.length + 1, // Exemplo de geração de código
            dataRegistro: new Date(),
            dataAlteracao: new Date(),
        };
        this.tarefas.push(tarefa);
        return tarefa;
    }

    alterar(codigo: number, tarefaAtualizada: TarefaUpdateDto): Tarefa | null {
        const tarefaIndex = this.tarefas.findIndex(tarefa => tarefa.codigo === codigo);
        if (tarefaIndex === -1) {
            return null;
        }
        const tarefa = this.tarefas[tarefaIndex];
        this.tarefas[tarefaIndex] = { ...tarefa, ...tarefaAtualizada, dataAlteracao: new Date() };
        return this.tarefas[tarefaIndex];
    }

    deletar(codigo: number): boolean {
        const tarefaIndex = this.tarefas.findIndex(tarefa => tarefa.codigo === codigo);
        if (tarefaIndex === -1) {
            return false;
        }
        this.tarefas.splice(tarefaIndex, 1);
        return true;
    }

    buscarPorId(codigo: number): Tarefa | null {
        return this.tarefas.find(tarefa => tarefa.codigo === codigo) || null;
    }
}

