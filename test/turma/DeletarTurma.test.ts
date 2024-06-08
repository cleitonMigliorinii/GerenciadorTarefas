import { TurmaCriacaoDto } from "../../src/models/turma/data/entity/Turma";
import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import { BuscaTurmaUseCase } from "../../src/models/turma/domain/useCases/BuscarTurmaUseCase";
import { CadastrarTurmaUseCase } from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase";
import { DeleteTurmaUseCase } from "../../src/models/turma/domain/useCases/DeletarTurmaUseCase";
import { FakeDataService } from "../../src/service/turmaFake.data.service";

describe("DeletarIesTest", () =>{

    let deletarTurmaUseCase : DeleteTurmaUseCase;
    let buscarTurmaUseCase : BuscaTurmaUseCase;
    let salvarTurmaUseCase: CadastrarTurmaUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const turmaRepository = new TurmaRepository();
        deletarTurmaUseCase = new DeleteTurmaUseCase(turmaRepository)
        buscarTurmaUseCase = new BuscaTurmaUseCase(turmaRepository)
        salvarTurmaUseCase = new CadastrarTurmaUseCase(turmaRepository)
        fakeService = FakeDataService();
    })

    it('deletar Turma cadastrada', async () => {

        const turmaCriacaoDto: TurmaCriacaoDto = {
            nome: fakeService.username,
            dataInicioPeriodo: fakeService.dataInicial,
            dataFinalPeriodo: fakeService.dataFinal,
            codigoIes: fakeService.codigoIes
        }
        const turma = await salvarTurmaUseCase.execute(turmaCriacaoDto);

        expect(turma).toBeDefined()

        await deletarTurmaUseCase.execute(turma.codigo);
        
        const turmaRetorno = await buscarTurmaUseCase.execute(turma.codigo);
        expect(turmaRetorno).toBeNull();
    })





})