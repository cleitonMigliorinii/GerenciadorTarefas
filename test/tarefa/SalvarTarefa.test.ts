import { TarefaCriacaoDto } from "../../src/models/tarefas/data/entity/Tarefa";
import { TarefaRepository } from "../../src/models/tarefas/data/repository/TarefaRepository";
import { FakeDataService } from "../../src/services/fake.data.service";

describe('Salvar Tarefa', () => {
  let repository: TarefaRepository;
  let fakeService: ReturnType<typeof FakeDataService>;

  beforeEach(() => {
    repository = new TarefaRepository();
    fakeService = FakeDataService();
  });

  it('Deve salvar uma nova tarefa', async () => {
    const tarefaDto: TarefaCriacaoDto = {
      disciplina: fakeService.nome,
      descricao: 'Descrição da tarefa',
      dataPrevista: new Date('2024-07-31'),
      situacao: 'Em andamento',
      disciplinaId: 1, // Substitua com o ID da disciplina correspondente
    };

    const tarefaSalva = await repository.salvar(tarefaDto);

    expect(tarefaSalva).toBeDefined();
    expect(tarefaSalva.codigo).toBeDefined();
    expect(tarefaSalva.disciplina).toBe(tarefaDto.disciplina);
    expect(tarefaSalva.descricao).toBe(tarefaDto.descricao);
    // Adicione mais expectativas conforme necessário
  });
});
