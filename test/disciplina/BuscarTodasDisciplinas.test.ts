import { DisciplinaCriacaoDto } from "../../src/models/disciplina/data/entity/Disciplina";
import { DisciplinaRepository } from "../../src/models/disciplina/data/repository/DisciplinaRepository";
import { BuscarTodasDisciplinasUseCase } from "../../src/models/disciplina/domain/useCases/BuscarTodasDisciplinas";
import { SalvarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/SalvarUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("Busca de Todas as Disciplinas", () => {

    let buscarTodasDisciplinasUseCase : BuscarTodasDisciplinasUseCase;
    let salvarDisciplinaUseCase: SalvarDisciplinaUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const disciplinaRoutes = new DisciplinaRepository();
        buscarTodasDisciplinasUseCase = new BuscarTodasDisciplinasUseCase(disciplinaRoutes)
        salvarDisciplinaUseCase = new SalvarDisciplinaUseCase(disciplinaRoutes)
        fakeService = FakeDataService();
    })

    it('Buscar todas as disciplinas', async () => {

        const disciplinaCriacaoDto: DisciplinaCriacaoDto = {
            nome: fakeService.nome,
            professor: fakeService.nome,
            coordenador: fakeService.nome
        }
        const disciplina = await salvarDisciplinaUseCase.execute(disciplinaCriacaoDto);

        const disciplinasBusca = await buscarTodasDisciplinasUseCase.execute();

        expect(disciplinasBusca).toBeDefined();
        expect(disciplinasBusca?.length).toBeGreaterThan(0);

        const disciplinaEncontrada = disciplinasBusca?.find(d => d.codigo === disciplina.codigo);

        expect(disciplinaEncontrada).toBeDefined();
        expect(disciplinaEncontrada!.nome).toBe(disciplina.nome);
        expect(disciplinaEncontrada!.professor).toBe(disciplina.professor);
        expect(disciplinaEncontrada!.coordenador).toBe(disciplina.coordenador);
    })

})