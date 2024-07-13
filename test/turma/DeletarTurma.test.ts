import { IesCriacaoDto } from "../../src/models/ies/data/entity/Ies";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository";
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { TurmaCriacaoDto } from "../../src/models/turma/data/entity/Turma";
import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import { BuscaTurmaUseCase } from "../../src/models/turma/domain/useCases/BuscarTurmaUseCase";
import { CadastrarTurmaUseCase } from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase";
import { DeleteTurmaUseCase } from "../../src/models/turma/domain/useCases/DeletarTurmaUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("DeletarIesTest", () =>{

    let deletarTurmaUseCase : DeleteTurmaUseCase;
    let buscarTurmaUseCase : BuscaTurmaUseCase;
    let salvarTurmaUseCase: CadastrarTurmaUseCase; 
    let salvarIesUseCase: SalvarIesUseCase;
    let fakeService: any;

    beforeEach( ()=>{
        const turmaRepository = new TurmaRepository();
        deletarTurmaUseCase = new DeleteTurmaUseCase(turmaRepository)
        buscarTurmaUseCase = new BuscaTurmaUseCase(turmaRepository)
        salvarTurmaUseCase = new CadastrarTurmaUseCase(turmaRepository)
        salvarIesUseCase = new SalvarIesUseCase(new IesRepository())
        fakeService = FakeDataService();
    })

    it('deletar Turma cadastrada', async () => {

        const iesCriacaoDto: IesCriacaoDto = {
            nome: fakeService.empresa,
            cnpj: fakeService.cnpj
        }

        const ies = await salvarIesUseCase.execute(iesCriacaoDto);

        const turmaCriacaoDto: TurmaCriacaoDto = {
            nome: fakeService.username,
            dataInicioPeriodo: fakeService.dataInicial,
            dataFinalPeriodo: fakeService.dataFinal,
            iesCodigo: ies.codigo
        }
        const turma = await salvarTurmaUseCase.execute(turmaCriacaoDto);

        expect(turma).toBeDefined()

        await deletarTurmaUseCase.execute(turma.codigo);
        
        const turmaRetorno = await buscarTurmaUseCase.execute(turma.codigo);
        expect(turmaRetorno).toBeNull();
    })





})