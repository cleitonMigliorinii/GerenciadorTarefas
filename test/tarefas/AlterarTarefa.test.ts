import { TarefaUpdateDto } from "../../src/models/tarefas/data/entity/Tarefa";
import { AlterarTarefaUseCase } from "../../src/models/tarefas/domain/useCases/AlterarTarefaUseCase";
import { TarefaRepository } from "../../src/models/tarefas/data/repository/TarefaRepository";

let alterarTarefaUseCase: AlterarTarefaUseCase;
let tarefaRepository: TarefaRepository;

beforeEach(() => {
    tarefaRepository = new TarefaRepository();
    alterarTarefaUseCase = new AlterarTarefaUseCase(tarefaRepository);
});

test('Alterar Tarefa', async () => {
    const codigoTarefa = 1; // Suponha que esta seja a ID da tarefa a ser alterada
    const tarefaAtualizada: TarefaUpdateDto = {
        // Preencha os campos que deseja alterar
    };

    const tarefaAlterada = await alterarTarefaUseCase.execute(codigoTarefa, tarefaAtualizada);
    expect(tarefaAlterada).toBeDefined();
    // Adicione mais asserções conforme necessário para verificar se a tarefa foi alterada corretamente
});
