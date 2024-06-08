import { BuscarTarefaPorIdUseCase } from "../../src/models/tarefas/domain/useCases/BuscarTarefaPorIdUseCase";
import { TarefaRepository } from "../../src/models/tarefas/data/repository/TarefaRepository";

let buscarTarefaPorIdUseCase: BuscarTarefaPorIdUseCase;
let tarefaRepository: TarefaRepository;

beforeEach(() => {
    tarefaRepository = new TarefaRepository();
    buscarTarefaPorIdUseCase = new BuscarTarefaPorIdUseCase(tarefaRepository);
});

test('Buscar Tarefa por ID', async () => {
    const codigoTarefa = 1; // Suponha que esta seja a ID da tarefa a ser buscada

    const tarefaEncontrada = await buscarTarefaPorIdUseCase.execute(codigoTarefa);
    expect(tarefaEncontrada).toBeDefined();
    // Adicione mais asserções conforme necessário para verificar se a tarefa foi encontrada corretamente
});
