import { TarefaCriacaoDto, Tarefa } from "../../src/models/tarefas/data/entity/Tarefa";
import { TarefaRepository } from "../../src/models/tarefas/data/repository/TarefaRepository";
import { FakeDataService } from "../../src/services/fake.data.service";

describe('Buscar Tarefa por ID', () => {
  let repository: TarefaRepository;
  let fakeService: ReturnType<typeof FakeDataService>;

  beforeEach(() => {
    repository = new TarefaRepository();
    fakeService = FakeDataService();
  });

  it('Deve buscar uma tarefa por ID', async () => {
    // Primeiro, crie uma tarefa
    const tarefaDto: TarefaCriacaoDto = {
      disciplina: fakeService.nome,
      descricao: 'Tarefa para buscar',
      dataPrevista: new Date('2024-07-31'),
      situacao: 'Em andamento',
      disciplinaId: 1,
    };
    const tarefaSalva = await repository.salvar(tarefaDto);

    // Agora, busque a tarefa por ID
    const tarefaEncontrada = await repository.buscarPorId(tarefaSalva.codigo);

    // Verifique se a tarefa foi encontrada
    expect(tarefaEncontrada).not.toBeNull();

    if (tarefaEncontrada) {
      expect(tarefaEncontrada.codigo).toBe(tarefaSalva.codigo);
      expect(tarefaEncontrada.disciplina).toBe(tarefaDto.disciplina);
      expect(tarefaEncontrada.descricao).toBe(tarefaDto.descricao);
      expect(tarefaEncontrada.dataPrevista).toEqual(tarefaDto.dataPrevista);
      expect(tarefaEncontrada.situacao).toBe(tarefaDto.situacao);
      expect(tarefaEncontrada.codigoDisciplina).toBe(tarefaDto.disciplinaId);
    } else {
      fail('A tarefa não foi encontrada quando deveria ter sido.');
    }
  });

  it('Deve retornar null ao buscar uma tarefa inexistente', async () => {
    const idInexistente = 9999; // Um ID que você tem certeza que não existe
    const tarefaInexistente = await repository.buscarPorId(idInexistente);
    expect(tarefaInexistente).toBeNull();
  });
});