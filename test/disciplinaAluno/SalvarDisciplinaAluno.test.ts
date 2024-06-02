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

    it('teste de vinculação de aluno com disciplina', async () => {

        const disciplinaAlunoCriacaoDto: DisciplinaAlunoCriacaoDto = {
            codigoAluno: fakeService.codigoAluno,
            codigoDisciplina: fakeService.codigoDisciplina,
            situacao: fakeService.situacao
        }

        const disciplinaAluno = await salvarDisciplinaAlunoUseCase.execute(disciplinaAlunoCriacaoDto);

        expect(disciplinaAluno).toBeDefined();
        expect(disciplinaAlunoCriacaoDto.codigoAluno).toBe(disciplinaAluno.codigoAluno);
        expect(disciplinaAlunoCriacaoDto.codigoDisciplina).toBe(disciplinaAluno.codigoDisciplina);
        expect(disciplinaAlunoCriacaoDto.situacao).toBe(disciplinaAluno.situacao)

    })

    it('teste de vinculação de aluno em disciplina já cadastrada', async () =>{

        const codigoDisciplina = fakeService.codigoDisciplina;
        let disciplinaAlunoTest: DisciplinaAlunoCriacaoDto = {
            codigoAluno : '1',
            codigoDisciplina,
            situacao: 'Ativo',
        } 

        await salvarDisciplinaAlunoUseCase.execute(disciplinaAlunoTest);

        //disciplinaAlunoTest.codigoAluno = 'Usuario Fralde'

        try{
            const disciplinaAluno = await salvarDisciplinaAlunoUseCase.execute(disciplinaAlunoTest)
            expect(disciplinaAluno).toBeUndefined();
        }catch(error: any){
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Problema ao criar IES")
        }
    })

})