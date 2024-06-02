import { TarefaCriacaoDto } from "../../src/models/tarefas/data/entity/Tarefa";
import { SalvarTarefaUseCase } from "../../src/models/tarefas/domain/useCases/SalvarTarefaUseCase";
import { TarefaRepository } from "../../src/models/tarefas/data/repository/TarefaRepository";

let salvarTarefaUseCase: SalvarTarefaUseCase;
let tarefaRepository: TarefaRepository;

beforeEach(() => {
    tarefaRepository = new TarefaRepository();
    salvarTarefaUseCase = new SalvarTarefaUseCase(tarefaRepository);
});

test('Salvar Tarefa', async () => {
    const tarefaDto: TarefaCriacaoDto = {
        disciplina: 'Matemática', // Preencha os dados necessários para criar uma tarefa
        disciplinaId: 1,
        situacao: 'Pendente',
        descricao: 'Resolver exercícios de matemática',
        dataPrevista: new Date('2024-06-10'),
        // Preencha outras propriedades necessárias
    };

    const tarefaSalva = await salvarTarefaUseCase.execute(tarefaDto);
    expect(tarefaSalva).toBeDefined();
    // Adicione mais asserções conforme necessário para verificar se a tarefa foi salva corretamente
});
