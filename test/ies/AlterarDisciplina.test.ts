import { DisciplinaCriacaoDto, DisciplinaUpdateDto } from "../../src/models/disciplina/data/entity/Disciplina";
import { DisciplinaRepository } from "../../src/models/disciplina/data/repository/DisciplinaRepository";
import { AlterarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/AlterarUseCase";
import { SalvarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/SalvarUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("AlteracaoDisciplinaTest", () =>{

    let alterarDisciplinaUseCase : AlterarDisciplinaUseCase;
    let salvarDisciplinaUseCase: SalvarDisciplinaUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const disciplinaRepository = new DisciplinaRepository();
        alterarDisciplinaUseCase = new AlterarDisciplinaUseCase(disciplinaRepository)
        salvarDisciplinaUseCase = new SalvarDisciplinaUseCase(disciplinaRepository)
        fakeService = FakeDataService();
    })

    it('Alterar disciplina cadastrada', async () => {

        const disciplinaCriacaoDto: DisciplinaCriacaoDto = {
            nome: fakeService.username,
            professor: fakeService.professor,
            coordenador: fakeService.coordenador
        }
        const disciplina = await salvarDisciplinaUseCase.execute(disciplinaCriacaoDto);

        const disciplinaAlterarDto : DisciplinaUpdateDto = {
            nome: "UPDATE DISCIPLINA",
            professor: "UPDATE DISCIPLINA",
            coordenador: "UPDATE DISCIPLINA"
        }

        const disciplinaUpdate = 
            await alterarDisciplinaUseCase.execute(disciplina.codigo, disciplinaAlterarDto);

        expect(disciplinaUpdate).toBeDefined()
        expect(disciplinaUpdate.codigo).toBe(disciplina.codigo);
        expect(disciplinaUpdate.nome).toBe(disciplinaAlterarDto.nome);
        expect(disciplinaUpdate.professor).toBe(disciplinaAlterarDto.professor);
        expect(disciplinaUpdate.coordenador).toBe(disciplinaAlterarDto.coordenador)
    })

})