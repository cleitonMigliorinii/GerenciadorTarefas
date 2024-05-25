import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import {CadastrarTurmaUseCase} from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase"
import { FakeDataService } from "../../src/service/turmaFake.data.service";
import { TurmaCriacaoDto } from "../../src/models/turma/data/entity/Turma";
import exp from "constants";


describe('SalvarTurma', () =>{

    let cadastrarTurmaUseCase: CadastrarTurmaUseCase;
    let fakeService: any;

    beforeEach(()=>{
        const turmaRepository = new TurmaRepository();
        cadastrarTurmaUseCase = new CadastrarTurmaUseCase(turmaRepository)
        fakeService = FakeDataService();
    })

    it('teste de criação de nova Turma', async () => {

    const turmaCriacaoDto: TurmaCriacaoDto = {
        nome: fakeService.username,
        dataInicioPeriodo: fakeService.dataInicial,
        dataFinalPeriodo: fakeService.dataFinal,
        codigoIes: "555"
    }

    console.log("Username: " + FakeDataService().username);

    const turma = await cadastrarTurmaUseCase.execute(turmaCriacaoDto);

    expect(turma).toBeDefined();
    expect(turma.codigo).toBeDefined();
    expect(turma.nome).toBe(turmaCriacaoDto.nome);
    expect(turma.dataInicioPeriodo).toBe(turmaCriacaoDto.dataInicioPeriodo);
    expect(turma.dataFinalPeriodo).toBe(turmaCriacaoDto.dataFinalPeriodo);
    expect(turma.codigoIes).toBe(turmaCriacaoDto.codigoIes)


    })

})