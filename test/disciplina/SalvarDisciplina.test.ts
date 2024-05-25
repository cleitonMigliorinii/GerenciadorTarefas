import { DisciplinaCriacaoDto } from "../../src/models/disciplina/data/entity/Disciplina";
import { DisciplinaRepository } from "../../src/models/disciplina/data/repository/DisciplinaRepository";
import { SalvarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/SalvarUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";


describe('SalvarDisciplina', () => {

    let salvarDisciplinaUseCase: SalvarDisciplinaUseCase;
    let fakeService: any;

    beforeEach(() => {
        //Sempre antes do teste vai rodar esse bloco
        const disciplinaRepository = new DisciplinaRepository();
        salvarDisciplinaUseCase = new SalvarDisciplinaUseCase(disciplinaRepository);
        fakeService = FakeDataService();
    })

    it('teste de criação de nova disciplina', async () => {

        const disciplinaCriacaoDto: DisciplinaCriacaoDto = {
            nome: fakeService.nome,
            professor: fakeService.professor,
            coordenador: fakeService.coordenador
        }

        console.log(disciplinaCriacaoDto);

        const disciplina = await salvarDisciplinaUseCase.execute(disciplinaCriacaoDto);

        expect(disciplina).toBeDefined();
        expect(disciplina.codigo).toBeDefined();
        expect(disciplinaCriacaoDto.nome).toBe(disciplina.nome);
        expect(disciplinaCriacaoDto.professor).toBe(disciplina.professor);
        expect(disciplinaCriacaoDto.coordenador).toBe(disciplina.coordenador);

    })

})