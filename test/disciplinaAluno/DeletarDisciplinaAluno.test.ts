
import { DisciplinaRepository } from "../../src/models/disciplina/data/repository/DisciplinaRepository";
import { SalvarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/SalvarUseCase";
import { DisciplinaAlunoCriacaoDto } from "../../src/models/disciplinaAluno/data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../src/models/disciplinaAluno/data/repository/disciplinaAlunoRepository";
import { BuscarDisciplinaAlunoPorAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/BuscarDisciplinaAlunoPorAlunoUseCase";
import { DeletarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/DeletarDisciplinaAlunoUseCase";
import { SalvarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/SalvarDisciplinaAlunoUseCase";
import { UsuarioRepository } from "../../src/models/usuario/data/repository/UsuarioRepository";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";


describe("DeletarDisciplinaAlunoTest", () => {

    let deletarDisciplinaAlunoUseCase: DeletarDisciplinaAlunoUseCase;
    let buscarDisciplinaAlunoPorAlunoUseCase: BuscarDisciplinaAlunoPorAlunoUseCase;
    let salvarDisciplinaAlunoUseCase: SalvarDisciplinaAlunoUseCase;
    let salvarAlunoUseCase: SalvarUsuarioUseCase;
    let salvarDisciplinaUseCase: SalvarDisciplinaUseCase;
    let fakeService: any;

    beforeEach(() => {

        const disciplinaAlunoRepository = new DisciplinaAlunoRepository();
        deletarDisciplinaAlunoUseCase = new DeletarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        buscarDisciplinaAlunoPorAlunoUseCase = new BuscarDisciplinaAlunoPorAlunoUseCase(disciplinaAlunoRepository)
        salvarDisciplinaAlunoUseCase = new SalvarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        const usuarioRepository = new UsuarioRepository();
        salvarAlunoUseCase = new SalvarUsuarioUseCase(usuarioRepository);
        const disciplinaRepository = new DisciplinaRepository();
        salvarDisciplinaUseCase = new SalvarDisciplinaUseCase(disciplinaRepository);
        fakeService = FakeDataService();
    })

    it('deletar aluno cadastrado em disciplina', async () => {


        const alunoCriacaoDto = {

            RA: fakeService.RA,
            nomeUsuario: fakeService.nome,
            senhaUsuario: fakeService.senha,
            emailUsuario: fakeService.email,
            telefoneUsuario: fakeService.telefone,
            tipoUsuario: fakeService.tipoUser,
            turmaCodigo: fakeService.turma,
            situacaoUsuario: fakeService.situacao
        }

        const aluno = await salvarAlunoUseCase.execute(alunoCriacaoDto);

        const disciplinaCriacaoDto = {
            nome: fakeService.nome,
            professor: fakeService.nome,
            coordenador: fakeService.nome
        }

        const disciplina = await salvarDisciplinaUseCase.execute(disciplinaCriacaoDto);

        const disciplinaAlunoCriacaoDto: DisciplinaAlunoCriacaoDto = {
            codigoAluno: aluno.RA,

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