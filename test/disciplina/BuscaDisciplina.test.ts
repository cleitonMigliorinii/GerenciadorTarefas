import { DisciplinaCriacaoDto } from "../../src/models/disciplina/data/entity/Disciplina";
import { DisciplinaRepository } from "../../src/models/disciplina/data/repository/DisciplinaRepository";
import { BuscarDisciplinaPorCodigoUseCase } from "../../src/models/disciplina/domain/useCases/BuscarPorCodigo";
import { SalvarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/SalvarUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("Busca de Disciplina", () => {

    let buscarDisplicinaPorCodigoUseCase : BuscarDisciplinaPorCodigoUseCase;
    let salvarDisciplinaUseCase: SalvarDisciplinaUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const disciplinaRoutes = new DisciplinaRepository();
        buscarDisplicinaPorCodigoUseCase = new BuscarDisciplinaPorCodigoUseCase(disciplinaRoutes)
        salvarDisciplinaUseCase = new SalvarDisciplinaUseCase(disciplinaRoutes)
        fakeService = FakeDataService();
    })

    it('Buscar disciplina por Código', async () => {

        const disciplinaCriacaoDto: DisciplinaCriacaoDto = {
            nome: fakeService.nome,
            professor: fakeService.nome,
            coordenador: fakeService.nome
        }
        const disciplina = await salvarDisciplinaUseCase.execute(disciplinaCriacaoDto);

        const disciplinaBusca = await buscarDisplicinaPorCodigoUseCase.execute(disciplina.codigo);

        expect(disciplinaBusca).toBeDefined();
        expect(disciplina.codigo).toBe(disciplinaBusca!.codigo)
        expect(disciplina.nome).toBe(disciplinaBusca!.nome)
        expect(disciplina.professor).toBe(disciplinaBusca!.professor)
        expect(disciplina.coordenador).toBe(disciplinaBusca!.coordenador)
    })

    it('verificar Disciplina não encontrada', async () => {

        const codigo = '00'
        const disciplinaBusca = await buscarDisplicinaPorCodigoUseCase.execute(codigo);

        expect(disciplinaBusca).toBeNull();

    })


})