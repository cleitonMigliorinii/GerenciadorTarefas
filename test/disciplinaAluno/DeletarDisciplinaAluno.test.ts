
import { DisciplinaAlunoCriacaoDto } from "../../src/models/disciplinaAluno/data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../src/models/disciplinaAluno/data/repository/disciplinaAlunoRepository";
import { BuscarDisciplinaAlunoPorAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/BuscarDisciplinaAlunoPorAlunoUseCase";
import { DeletarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/DeletarDisciplinaAlunoUseCase";
import { SalvarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/SalvarDisciplinaAlunoUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("DeletarIesTest", () =>{

    let deletarDisciplinaAlunoUseCase : DeletarDisciplinaAlunoUseCase;
    let buscarDisciplinaAlunoPorAlunoUseCase : BuscarDisciplinaAlunoPorAlunoUseCase;
    let salvarDisciplinaAlunoUseCase: SalvarDisciplinaAlunoUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const disciplinaAlunoRepository = new DisciplinaAlunoRepository();
        deletarDisciplinaAlunoUseCase = new DeletarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        buscarDisciplinaAlunoPorAlunoUseCase = new BuscarDisciplinaAlunoPorAlunoUseCase(disciplinaAlunoRepository)
        salvarDisciplinaAlunoUseCase = new SalvarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        fakeService = FakeDataService();
    })

    it('deletar ies cadastrada', async () => {

        const disciplinaAlunoCriacaoDto: DisciplinaAlunoCriacaoDto = {
            codigoAluno: fakeService.codigoAluno,
            codigoDisciplina: fakeService.codigoDisciplina,
            situacao: fakeService.situacao
        }
        const disciplinaAluno = await salvarDisciplinaAlunoUseCase.execute(disciplinaAlunoCriacaoDto);

        expect(disciplinaAluno).toBeDefined()

        await deletarDisciplinaAlunoUseCase.execute(disciplinaAluno.codigo);
        
        const disciplinaAlunoRetorno = await buscarDisciplinaAlunoPorAlunoUseCase.execute(disciplinaAluno.codigoAluno);
        expect(disciplinaAlunoRetorno).toBeNull();
    })





})