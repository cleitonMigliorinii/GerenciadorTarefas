import { exec } from "child_process";
import { IesCriacaoDto } from "../../src/models/ies/data/entity/Ies";
import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import {CadastrarTurmaUseCase} from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase"
import { FakeDataService } from "../../src/service/turmaFake.data.service";
import { TurmaCriacaoDto } from "../../src/models/turma/data/entity/Turma";


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

    const ies = await cadastrarTurmaUseCase.execute(turmaCriacaoDto);

    expect(ies).toBeDefined();
    expect(ies.codigo).toBeDefined();
    expect(ies.nome).toBe(turmaCriacaoDto.nome);
    expect(ies.dataInicioPeriodo).toBe(turmaCriacaoDto.dataInicioPeriodo);
    expect(ies.dataFinalPeriodo).toBe(turmaCriacaoDto.dataFinalPeriodo);


    })

})