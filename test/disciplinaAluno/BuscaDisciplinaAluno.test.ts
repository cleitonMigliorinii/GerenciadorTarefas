
import { DisciplinaRepository } from "../../src/models/disciplina/data/repository/DisciplinaRepository";
import { DisciplinaCriacaoDto } from "../../src/models/disciplina/data/entity/Disciplina";
import { SalvarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/SalvarUseCase";
import { DisciplinaAlunoCriacaoDto } from "../../src/models/disciplinaAluno/data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../src/models/disciplinaAluno/data/repository/disciplinaAlunoRepository";
import { BuscarDisciplinaAlunoPorDisciplinaUseCase } from "../../src/models/disciplinaAluno/domain/useCase/BuscarDisciplinaAlunoPorDisciplinaUseCase";
import { SalvarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/SalvarDisciplinaAlunoUseCase";
import { UsuarioRepository } from "../../src/models/usuario/data/repository/UsuarioRepository";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("BuscarDisciplinaAlunoTest", () => { 

    let buscarDisciplinaAlunoPorDisciplinaUseCase: BuscarDisciplinaAlunoPorDisciplinaUseCase;
    let salvarDisciplinaAlunoUseCase: SalvarDisciplinaAlunoUseCase;
    let salvarAlunoUseCase: SalvarUsuarioUseCase;
    let salvarDisciplinaUseCase: SalvarDisciplinaUseCase;

    let fakeService: any;

    beforeEach(() => {
        const disciplinaAlunoRepository = new DisciplinaAlunoRepository();
        buscarDisciplinaAlunoPorDisciplinaUseCase = new BuscarDisciplinaAlunoPorDisciplinaUseCase(disciplinaAlunoRepository)
        salvarDisciplinaAlunoUseCase = new SalvarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        const usuarioRepository = new UsuarioRepository();
        salvarAlunoUseCase = new SalvarUsuarioUseCase(usuarioRepository);
        const disciplinaRepository = new DisciplinaRepository();
        salvarDisciplinaUseCase = new SalvarDisciplinaUseCase(disciplinaRepository);
        fakeService = FakeDataService();
    })

    it('Buscar alunos por codigo de disciplina', async () => {

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

        const disciplinaAlunoBusca = await buscarDisciplinaAlunoPorDisciplinaUseCase.execute(disciplinaAluno.codigoDisciplina);

        expect(disciplinaAluno).toBeDefined();

    })

    it('verificar vinculo não encontrado', async () => {

        const codigoDisciplina = '000'
        const disciplinaAlunoBusca = await buscarDisciplinaAlunoPorDisciplinaUseCase.execute(codigoDisciplina);

        expect(disciplinaAlunoBusca).toEqual([])

    })


})