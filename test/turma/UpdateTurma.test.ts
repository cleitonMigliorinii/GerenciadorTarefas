import { TurmaCriacaoDto, TurmaUpdateDto } from "../../src/models/turma/data/entity/Turma";
import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import { CadastrarTurmaUseCase } from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase";
import { UpdateTurmaUseCase } from "../../src/models/turma/domain/useCases/UpdateTurmaUseCase";
import { FakeDataService } from "../../src/service/turmaFake.data.service";

describe("AlteraçãoTurmaTest",  () => {

    let alterarTurmaUseCase : UpdateTurmaUseCase;
    let salvarTurmaUseCase : CadastrarTurmaUseCase;
    let fakeService: any

    beforeEach( () => {

        const turmaRepository = new TurmaRepository();
        alterarTurmaUseCase = new UpdateTurmaUseCase(turmaRepository)
        salvarTurmaUseCase = new CadastrarTurmaUseCase(turmaRepository)
        fakeService = FakeDataService();
    })

    it('Alterar turma Cadastrada', async () => {
        
        const turmaCriacaoDto: TurmaCriacaoDto = {
            nome: fakeService.username,
            dataFinalPeriodo: fakeService.dataInicial,
            dataInicioPeriodo: fakeService.dataFinal,
            codigoIes:'555'
            }
    
        const turma = await salvarTurmaUseCase.execute(turmaCriacaoDto);

        
        const turmaUpdateDto : TurmaUpdateDto = {
            nome: "UPDATE TURMA"
        }

        const turmaUpdate  = await alterarTurmaUseCase.execute(turma.codigoIes, turmaUpdateDto);

        expect(turmaUpdate).toBeDefined();
        expect(turmaUpdate.codigoIes).toBe(turma.codigoIes);
        expect(turmaUpdate.dataFinalPeriodo).toBe(turma.dataFinalPeriodo)
        expect(turmaUpdate.dataInicioPeriodo).toBe(turma.dataInicioPeriodo)
        expect(turmaUpdate.nome).toBe(turmaUpdateDto.nome);

    })
})