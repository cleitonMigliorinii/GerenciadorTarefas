import { TarefaCriacaoDto } from "../../src/models/tarefas/data/entity/Tarefa";
import { TarefaRepository } from "../../src/models/tarefas/data/repository/TarefaRepository";
import { BuscarTarefaPorIdUseCase } from "../../src/models/tarefas/domain/useCases/BuscarTarefaPorIdUseCase";
import { DeletarTarefaUseCase } from "../../src/models/tarefas/domain/useCases/DeletarTarefaUseCase";
import { SalvarTarefaUseCase } from "../../src/models/tarefas/domain/useCases/SalvarTarefaUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";


describe('Deletar Tarefa', () => {
  let deletarTarefaUseCase: DeletarTarefaUseCase;
  let criarTarefaUseCase: SalvarTarefaUseCase;
  let buscarTarefaUseCase: BuscarTarefaPorIdUseCase;
  let fakeService: any;

  beforeEach(() => {
    const tarefaRepository = new TarefaRepository();
    deletarTarefaUseCase = new DeletarTarefaUseCase(tarefaRepository);
    criarTarefaUseCase = new SalvarTarefaUseCase(tarefaRepository);
    buscarTarefaUseCase = new BuscarTarefaPorIdUseCase(tarefaRepository);
    fakeService = FakeDataService();
  });

  it('deve excluir uma tarefa existente', async () => {
    const tarefaCriacaoDto: TarefaCriacaoDto = {
      disciplina: fakeService.disciplina,
      disciplinaId: 1,
      situacao: 'Pendente',
      descricao: fakeService.descricao,
      dataPrevista: new Date(),
    };

    const tarefaCriada = await criarTarefaUseCase.execute(tarefaCriacaoDto);
    const codigoTarefa = tarefaCriada.codigo;

    // Verifique se a tarefa existe antes de tentar excluí-la
    const tarefaEncontrada = await buscarTarefaUseCase.execute(codigoTarefa);
    expect(tarefaEncontrada).toBeDefined();

    await deletarTarefaUseCase.execute(codigoTarefa);

    // Verifique se a tarefa foi realmente excluída
    try {
      await buscarTarefaUseCase.execute(codigoTarefa);
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Tarefa não encontrada');
    }
  });
});