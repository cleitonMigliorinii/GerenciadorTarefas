
import { IesCriacaoDto } from "../../src/models/ies/data/entity/Ies";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository";
import { BuscarCNPJUseCase } from "../../src/models/ies/domain/useCases/BuscarCNPJUseCase";
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { TurmaCriacaoDto } from "../../src/models/turma/data/entity/Turma";
import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import { BuscaTurmaUseCase } from "../../src/models/turma/domain/useCases/BuscarTurmaUseCase";
import { CadastrarTurmaUseCase } from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";


describe("Busca de IES", () => {

    let buscarTurmaUseCase : BuscaTurmaUseCase;
    let cadastrarTurmaUseCase: CadastrarTurmaUseCase; 
    let salvarIesUseCase: SalvarIesUseCase;
    let fakeService: any;

    beforeEach( ()=>{
        const turmaRepository = new TurmaRepository();
        buscarTurmaUseCase = new BuscaTurmaUseCase(turmaRepository)
        cadastrarTurmaUseCase = new CadastrarTurmaUseCase(turmaRepository)
        salvarIesUseCase = new SalvarIesUseCase(new IesRepository())
        fakeService = FakeDataService();
    })

    it('Buscar turma por codigo', async () => {

        const iesCriacaoDto: IesCriacaoDto = {
            nome: fakeService.empresa,
            cnpj: fakeService.cnpj
        }

        const ies = await salvarIesUseCase.execute(iesCriacaoDto);

        const turmaCriacaoDto: TurmaCriacaoDto = {
            nome: fakeService.username,
            dataFinalPeriodo: fakeService.dataCriacao,
            dataInicioPeriodo: fakeService.dataCriacao,
            iesCodigo:ies.codigo
        }
        const turma = await cadastrarTurmaUseCase.execute(turmaCriacaoDto);

        const turmaBusca = await buscarTurmaUseCase.execute(turma.codigo);

        expect(turmaBusca).toBeDefined();
        expect(turma.codigo).toBe(turmaBusca!.codigo)
    })

    it('verificar TURMA não encontrada', async () => {

        const codigo: string = '999'
        const turmaBusca = await buscarTurmaUseCase.execute(codigo);

        expect(turmaBusca).toBeNull();
    })
})