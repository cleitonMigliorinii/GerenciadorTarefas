import { DisciplinaRepository } from "../../src/models/disciplina/data/repository/DisciplinaRepository";
import { SalvarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/SalvarUseCase";
import { DisciplinaAlunoCriacaoDto, DisciplinaAlunoUpdateDto } from "../../src/models/disciplinaAluno/data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../src/models/disciplinaAluno/data/repository/disciplinaAlunoRepository";
import { AlterarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/AlterarDisciplinaAlunoUseCase";
import { SalvarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/SalvarDisciplinaAlunoUseCase";
import { UsuarioRepository } from "../../src/models/usuario/data/repository/UsuarioRepository";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("AlteracaoDisciplinaAlunoTest", () => {


    let alterarDisciplinaAlunoUseCase: AlterarDisciplinaAlunoUseCase;
    let salvarDisciplinaAlunoUseCase: SalvarDisciplinaAlunoUseCase;
    let salvarAlunoUseCase: SalvarUsuarioUseCase;
    let salvarDisciplinaUseCase: SalvarDisciplinaUseCase;

    let fakeService: any;

    beforeEach(() => {
        const disciplinaAlunoRepository = new DisciplinaAlunoRepository();
        alterarDisciplinaAlunoUseCase = new AlterarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        salvarDisciplinaAlunoUseCase = new SalvarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        const usuarioRepository = new UsuarioRepository();
        salvarAlunoUseCase = new SalvarUsuarioUseCase(usuarioRepository);
        const disciplinaRepository = new DisciplinaRepository();
        salvarDisciplinaUseCase = new SalvarDisciplinaUseCase(disciplinaRepository);
        fakeService = FakeDataService();
    })

    it('Alterar vinculo aluno -> disciplina cadastrado', async () => {

        const alunoCriacaoDto = {
     
            RA: fakeService.RA,
            nomeUsuario: fakeService.nome,
            senhaUsuario: fakeService.senha,
            emailUsuario: fakeService.email,
            telefoneUsuario: fakeService.telefone,
            tipoUsuario: fakeService.tipoUser,
            turmaCodigo: fakeService.codigo,
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

        const disciplinaAlunoAlterarDto: DisciplinaAlunoUpdateDto = {
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