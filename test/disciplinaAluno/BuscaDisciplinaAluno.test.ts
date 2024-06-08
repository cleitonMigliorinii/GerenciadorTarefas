
import { DisciplinaAlunoCriacaoDto } from "../../src/models/disciplinaAluno/data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../src/models/disciplinaAluno/data/repository/disciplinaAlunoRepository";
import { BuscarDisciplinaAlunoPorDisciplinaUseCase } from "../../src/models/disciplinaAluno/domain/useCase/BuscarDisciplinaAlunoPorDisciplinaUseCase";
import { SalvarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/SalvarDisciplinaAlunoUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("BuscarDisciplinaAlunoTest", () => {

    let buscarDisciplinaAlunoPorDisciplinaUseCase : BuscarDisciplinaAlunoPorDisciplinaUseCase;
    let salvarDisciplinaAlunoUseCase: SalvarDisciplinaAlunoUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const disciplinaAlunoRepository = new DisciplinaAlunoRepository();
        buscarDisciplinaAlunoPorDisciplinaUseCase = new BuscarDisciplinaAlunoPorDisciplinaUseCase(disciplinaAlunoRepository)
        salvarDisciplinaAlunoUseCase = new SalvarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        fakeService = FakeDataService();
    })

    it('Buscar alunos por codigo de disciplina', async () => {

        const disciplinaAlunoCriacaoDto: DisciplinaAlunoCriacaoDto = {
            codigoAluno: fakeService.codigo,
            codigoDisciplina: fakeService.codigo,
            situacao: 'A'
        }
        const disciplinaAluno = await salvarDisciplinaAlunoUseCase.execute(disciplinaAlunoCriacaoDto);

        const disciplinaAlunoBusca = await buscarDisciplinaAlunoPorDisciplinaUseCase.execute(disciplinaAluno.codigoDisciplina);

        expect(disciplinaAluno).toBeDefined();

     })

    it('verificar vinculo não encontrado', async () => {

        const codigoDisciplina = '000'
        const disciplinaAlunoBusca = await buscarDisciplinaAlunoPorDisciplinaUseCase.execute(codigoDisciplina);

        expect(disciplinaAlunoBusca).toEqual([])

    })


})