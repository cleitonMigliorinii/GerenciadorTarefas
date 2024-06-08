
import { DisciplinaAlunoCriacaoDto, DisciplinaAlunoUpdateDto } from "../../src/models/disciplinaAluno/data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../src/models/disciplinaAluno/data/repository/disciplinaAlunoRepository";
import { AlterarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/AlterarDisciplinaAlunoUseCase";
import { SalvarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/SalvarDisciplinaAlunoUseCase";
import { AlterarIesUseCase } from "../../src/models/ies/domain/useCases/AlterarIesUseCase";
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("AlteracaoDisciplinaAlunoTest", () =>{

    let alterarDisciplinaAlunoUseCase : AlterarDisciplinaAlunoUseCase;
    let salvarDisciplinaAlunoUseCase: SalvarDisciplinaAlunoUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const disciplinaAlunoRepository = new DisciplinaAlunoRepository();
        alterarDisciplinaAlunoUseCase = new AlterarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        salvarDisciplinaAlunoUseCase = new SalvarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        fakeService = FakeDataService();
    })

    it('Alterar vinculo aluno -> disciplina cadastrado', async () => {

        const disciplinaAlunoCriacaoDto: DisciplinaAlunoCriacaoDto = {
            codigoAluno: fakeService.codigoAluno,
            codigoDisciplina: fakeService.codigoDisciplina,
            situacao: fakeService.situacao
        }
        const disciplinaAluno = await salvarDisciplinaAlunoUseCase.execute(disciplinaAlunoCriacaoDto);

        const disciplinaAlunoAlterarDto : DisciplinaAlunoUpdateDto = {
            situacao: "Inativo"
        }

        const disciplinaAlunoUpdate = 
            await alterarDisciplinaAlunoUseCase.execute(disciplinaAluno.codigo, disciplinaAlunoAlterarDto);

        expect(disciplinaAlunoUpdate).toBeDefined()
        expect(disciplinaAlunoUpdate.codigoAluno).toBe(disciplinaAluno.codigoAluno)
        expect(disciplinaAlunoUpdate.codigoDisciplina).toBe(disciplinaAluno.codigoDisciplina)
        expect(disciplinaAlunoUpdate.situacao).toBe(disciplinaAlunoAlterarDto.situacao);

    })





})