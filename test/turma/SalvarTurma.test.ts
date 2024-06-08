import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import { CadastrarTurmaUseCase } from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";
import { TurmaCriacaoDto } from "../../src/models/turma/data/entity/Turma";
import { IesCriacaoDto } from "../../src/models/ies/data/entity/Ies";
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository";

describe('SalvarTurma', () => {
    let cadastrarTurmaUseCase: CadastrarTurmaUseCase;
    let salvarIesUseCase: SalvarIesUseCase;
    let fakeService: ReturnType<typeof FakeDataService>;

    beforeEach(() => {
        const turmaRepository = new TurmaRepository();

        cadastrarTurmaUseCase = new CadastrarTurmaUseCase(turmaRepository);
        salvarIesUseCase = new SalvarIesUseCase(new IesRepository())
        fakeService = FakeDataService();
    });

    it('teste de criação de nova Turma', async () => {

        const iesCriacaoDto: IesCriacaoDto = {
            nome: fakeService.empresa,
            cnpj: fakeService.cnpj
        }

        const ies = await salvarIesUseCase.execute(iesCriacaoDto);

        const turmaCriacaoDto: TurmaCriacaoDto = {
            nome: fakeService.username,
            dataInicioPeriodo: fakeService.dataInicioPeriodo,
            dataFinalPeriodo: fakeService.dataFinalPeriodo,
            iesCodigo: ies.codigo
        };

        const turma = await cadastrarTurmaUseCase.execute(turmaCriacaoDto);

        expect(turma).toBeDefined();
        expect(turma.codigo).toBeDefined();
        expect(turma.nome).toBe(turmaCriacaoDto.nome);
        expect(turma.dataInicioPeriodo.toISOString()).toBe(turmaCriacaoDto.dataInicioPeriodo.toISOString());
        expect(turma.dataFinalPeriodo.toISOString()).toBe(turmaCriacaoDto.dataFinalPeriodo.toISOString());
        expect(turma.iesCodigo).toBe(turmaCriacaoDto.iesCodigo);
    });
});
