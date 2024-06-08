import { TurmaCriacaoDto, TurmaUpdateDto } from "../../src/models/turma/data/entity/Turma";
import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import { CadastrarTurmaUseCase } from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase";
import { UpdateTurmaUseCase } from "../../src/models/turma/domain/useCases/UpdateTurmaUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("AlteraçãoTurmaTest", () => {
    let alterarTurmaUseCase: UpdateTurmaUseCase;
    let salvarTurmaUseCase: CadastrarTurmaUseCase;
    let fakeService: ReturnType<typeof FakeDataService>;

    beforeEach(() => {
        const turmaRepository = new TurmaRepository();
        alterarTurmaUseCase = new UpdateTurmaUseCase(turmaRepository);
        salvarTurmaUseCase = new CadastrarTurmaUseCase(turmaRepository);
        fakeService = FakeDataService();
    });

    it('Alterar turma Cadastrada', async () => {
        const turmaCriacaoDto: TurmaCriacaoDto = {
            nome: fakeService.username,  
            dataInicioPeriodo: fakeService.dataInicioPeriodo,
            dataFinalPeriodo: fakeService.dataFinalPeriodo,
            codigoIes: fakeService.codigoIes
        };

        const turma = await salvarTurmaUseCase.execute(turmaCriacaoDto);

        const turmaUpdateDto: TurmaUpdateDto = {
            nome: "UPDATE TURMA"
        };

        const turmaUpdate = await alterarTurmaUseCase.execute(turma.codigo, turmaUpdateDto);

        expect(turmaUpdate).toBeDefined();
        expect(turmaUpdate.codigo).toBe(turma.codigo);  
        expect(turmaUpdate.codigoIes).toBe(turma.codigoIes);
        expect(turmaUpdate.dataFinalPeriodo.toISOString()).toBe(turma.dataFinalPeriodo.toISOString());
        expect(turmaUpdate.dataInicioPeriodo.toISOString()).toBe(turma.dataInicioPeriodo.toISOString());
        expect(turmaUpdate.nome).toBe(turmaUpdateDto.nome);
    });
});
