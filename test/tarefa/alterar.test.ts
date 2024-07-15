import { TarefaCriacaoDto } from "../../src/models/tarefas/data/entity/Tarefa";
import { TarefaRepository } from "../../src/models/tarefas/data/repository/TarefaRepository";
import { FakeDataService } from "../../src/services/fake.data.service";

describe('Salvar Tarefa', () => {
    let tarefaRepository: TarefaRepository;
    let fakeService: ReturnType<typeof FakeDataService>;

    beforeEach(() => {
        tarefaRepository = new TarefaRepository();
        fakeService = FakeDataService();
    });

    it('deve salvar uma nova tarefa', () => {
        const tarefaDto: TarefaCriacaoDto = {
            disciplina: "teste",
            descricao: "teste",
            dataPrevista: new Date('2024-07-15'), // Exemplo de data fixa
            situacao: 'pendente', // Exemplo de situacao fixa
            disciplinaId: 1 // Exemplo de ID de disciplina fixo
        };

        const tarefaSalva = tarefaRepository.salvar(tarefaDto);

        expect(tarefaSalva).toBeDefined();
        expect(tarefaSalva.codigo).toBeDefined();
        expect(tarefaSalva.disciplina).toBe(tarefaDto.disciplina);
        // Outros asserts conforme necessário
    });
});
