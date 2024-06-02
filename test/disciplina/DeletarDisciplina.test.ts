import { DisciplinaCriacaoDto } from "../../src/models/disciplina/data/entity/Disciplina";
import { DisciplinaRepository } from "../../src/models/disciplina/data/repository/DisciplinaRepository";
import { BuscarDisciplinaPorCodigoUseCase } from "../../src/models/disciplina/domain/useCases/BuscarPorCodigo";
import { DeletarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/DeletarUseCase";
import { SalvarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/SalvarUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("DeletarDisciplinaTest", () =>{

    let deletarDisciplinaUseCase : DeletarDisciplinaUseCase;
    let buscarDisplicinaPorCodigoUseCase : BuscarDisciplinaPorCodigoUseCase;
    let salvarDisciplinaUseCase: SalvarDisciplinaUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const disciplinaRepository = new DisciplinaRepository();
        deletarDisciplinaUseCase = new DeletarDisciplinaUseCase(disciplinaRepository)
        buscarDisplicinaPorCodigoUseCase = new BuscarDisciplinaPorCodigoUseCase(disciplinaRepository)
        salvarDisciplinaUseCase = new SalvarDisciplinaUseCase(disciplinaRepository)
        fakeService = FakeDataService();
    })

    it('deletar disciplina cadastrada', async () => {

        const disciplinaCriacaoDto: DisciplinaCriacaoDto = {
            nome: fakeService.nome,
            professor: fakeService.professor,
            coordenador: fakeService.coordenador,
        }
        const disciplina = await salvarDisciplinaUseCase.execute(disciplinaCriacaoDto);

        expect(disciplina).toBeDefined()

        await deletarDisciplinaUseCase.execute(disciplina.codigo);
        
        const disciplinaRetorno = await buscarDisplicinaPorCodigoUseCase.execute(disciplina.nome);
        expect(disciplinaRetorno).toBeNull();
    })





})