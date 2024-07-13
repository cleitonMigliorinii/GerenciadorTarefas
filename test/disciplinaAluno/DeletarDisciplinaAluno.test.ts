
import { DisciplinaCriacaoDto } from "../../src/models/disciplina/data/entity/Disciplina";
import { SalvarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/SalvarUseCase";
import { DisciplinaAlunoCriacaoDto } from "../../src/models/disciplinaAluno/data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../src/models/disciplinaAluno/data/repository/disciplinaAlunoRepository";
import { BuscarDisciplinaAlunoPorAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/BuscarDisciplinaAlunoPorAlunoUseCase";
import { DeletarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/DeletarDisciplinaAlunoUseCase";
import { SalvarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/SalvarDisciplinaAlunoUseCase";
import { UsuarioCriacaoDto } from "../../src/models/usuario/data/entity/usuario";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";


describe("DeletarDisciplinaAlunoTest", () =>{

    let deletarDisciplinaAlunoUseCase : DeletarDisciplinaAlunoUseCase;
    let buscarDisciplinaAlunoPorAlunoUseCase : BuscarDisciplinaAlunoPorAlunoUseCase;
    let salvarDisciplinaAlunoUseCase: SalvarDisciplinaAlunoUseCase; 
    let salvarDisciplinaUseCase: SalvarDisciplinaUseCase;
    let salvarUsuarioUseCase: SalvarUsuarioUseCase;
    let fakeService: any;
 
    beforeEach( ()=>{
        const disciplinaAlunoRepository = new DisciplinaAlunoRepository();
        deletarDisciplinaAlunoUseCase = new DeletarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        buscarDisciplinaAlunoPorAlunoUseCase = new BuscarDisciplinaAlunoPorAlunoUseCase(disciplinaAlunoRepository)
        salvarDisciplinaAlunoUseCase = new SalvarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        fakeService = FakeDataService();
    })

    it('deletar aluno cadastrado em disciplina', async () => {

        const disciplinaCriacaoDto: DisciplinaCriacaoDto = {
            nome: fakeService.nome,
            professor: fakeService.nome,
            coordenador: fakeService.nome
        }

        const disciplina = await salvarDisciplinaUseCase.execute(disciplinaCriacaoDto);

        const usuarioCriacaoDto: UsuarioCriacaoDto = {
            RA: fakeService.RA,
            nomeUsuario: fakeService.nome,
            senhaUsuario: fakeService.senha,
            emailUsuario: fakeService.email,
            telefoneUsuario: fakeService.telefone,
            tipoUsuario: fakeService.tipoUser,
            turmaID: fakeService.turma,
            situacaoUsuario: fakeService.situacao
        }

        const usuario = await salvarUsuarioUseCase.execute(usuarioCriacaoDto);

        const disciplinaAlunoCriacaoDto: DisciplinaAlunoCriacaoDto = {
            codigoAluno: usuario.RA,
            codigoDisciplina: disciplina.codigo,
            situacao: 'A'
        }
        const disciplinaAluno = await salvarDisciplinaAlunoUseCase.execute(disciplinaAlunoCriacaoDto);

        expect(disciplinaAluno).toBeDefined()

        await deletarDisciplinaAlunoUseCase.execute(disciplinaAluno.codigo);
        
        const disciplinaAlunoRetorno = await buscarDisciplinaAlunoPorAlunoUseCase.execute(disciplinaAluno.codigoAluno);
        expect(disciplinaAlunoRetorno).toEqual([]);
    })





})