import { DisciplinaAlunoCriacaoDto } from "../../src/models/disciplinaAluno/data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../src/models/disciplinaAluno/data/repository/disciplinaAlunoRepository";
import { SalvarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/SalvarDisciplinaAlunoUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";



describe('SalvarDisciplinaAluno', () => {

    let salvarDisciplinaAlunoUseCase: SalvarDisciplinaAlunoUseCase;
    let fakeService: any;

    beforeEach(() => {
        //Sempre antes do teste vai rodar esse bloco
        const disciplinaAlunoRepository = new DisciplinaAlunoRepository();
        salvarDisciplinaAlunoUseCase = new SalvarDisciplinaAlunoUseCase(disciplinaAlunoRepository);
        fakeService = FakeDataService();
    })

    it('teste de vinculação de aluno com nova disciplina', async () => {

        const disciplinaAlunoCriacaoDto: DisciplinaAlunoCriacaoDto = {
            codigoAluno: fakeService.codigo,
            codigoDisciplina: fakeService.codigo,
            situacao: 'A'
        }

        const disciplinaAluno = await salvarDisciplinaAlunoUseCase.execute(disciplinaAlunoCriacaoDto);

        expect(disciplinaAluno).toBeDefined();
        expect(disciplinaAlunoCriacaoDto.codigoAluno).toBe(disciplinaAluno.codigoAluno);
        expect(disciplinaAlunoCriacaoDto.codigoDisciplina).toBe(disciplinaAluno.codigoDisciplina);
        expect(disciplinaAlunoCriacaoDto.situacao).toBe(disciplinaAluno.situacao)

    })

})