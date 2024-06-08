import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import { CadastrarTurmaUseCase } from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase";
import { FakeDataService } from "../../src/service/turmaFake.data.service";
import { TurmaCriacaoDto } from "../../src/models/turma/data/entity/Turma";

describe('SalvarTurma', () => {
    let cadastrarTurmaUseCase: CadastrarTurmaUseCase;
    let fakeService: ReturnType<typeof FakeDataService>;

    beforeEach(() => {
        const turmaRepository = new TurmaRepository();
        cadastrarTurmaUseCase = new CadastrarTurmaUseCase(turmaRepository);
        fakeService = FakeDataService();
    });

    it('teste de criação de nova Turma', async () => {
        const turmaCriacaoDto: TurmaCriacaoDto = {
            nome: fakeService.username,
            dataInicioPeriodo: fakeService.dataInicioPeriodo,
            dataFinalPeriodo: fakeService.dataFinalPeriodo,
            codigoIes: fakeService.codigoIes
        };

        const turma = await cadastrarTurmaUseCase.execute(turmaCriacaoDto);

        expect(turma).toBeDefined();
        expect(turma.codigo).toBeDefined();
        expect(turma.nome).toBe(turmaCriacaoDto.nome);
        expect(turma.dataInicioPeriodo.toISOString()).toBe(turmaCriacaoDto.dataInicioPeriodo.toISOString());
        expect(turma.dataFinalPeriodo.toISOString()).toBe(turmaCriacaoDto.dataFinalPeriodo.toISOString());
        expect(turma.codigoIes).toBe(turmaCriacaoDto.codigoIes);
    });
});
