
import { DisciplinaRepository } from "../../src/models/disciplina/data/repository/DisciplinaRepository";
import { SalvarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/SalvarUseCase";
import { DisciplinaAlunoCriacaoDto } from "../../src/models/disciplinaAluno/data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../src/models/disciplinaAluno/data/repository/disciplinaAlunoRepository";
import { SalvarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/SalvarDisciplinaAlunoUseCase";
import { UsuarioRepository } from "../../src/models/usuario/data/repository/UsuarioRepository";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe('SalvarDisciplinaAluno', () => {

    let salvarDisciplinaAlunoUseCase: SalvarDisciplinaAlunoUseCase;
    let salvarAlunoUseCase: SalvarUsuarioUseCase;
    let salvarDisciplinaUseCase: SalvarDisciplinaUseCase;
    let fakeService: any;

    beforeEach(() => {
        //Sempre antes do teste vai rodar esse bloco
        const disciplinaAlunoRepository = new DisciplinaAlunoRepository();
        salvarDisciplinaAlunoUseCase = new SalvarDisciplinaAlunoUseCase(disciplinaAlunoRepository);
        const usuarioRepository = new UsuarioRepository();
        salvarAlunoUseCase = new SalvarUsuarioUseCase(usuarioRepository);
        const disciplinaRepository = new DisciplinaRepository();
        salvarDisciplinaUseCase = new SalvarDisciplinaUseCase(disciplinaRepository);
        fakeService = FakeDataService();
    })

    it('teste de vinculação de aluno com nova disciplina', async () => {

        const alunoCriacaoDto = {
            RA: fakeService.RA,
            nomeUsuario: fakeService.nome,
            senhaUsuario: fakeService.senha,
            emailUsuario: fakeService.email,
            telefoneUsuario: fakeService.telefone,
            tipoUsuario: fakeService.tipoUser,
            turmaID: fakeService.turma,
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

        expect(disciplinaAluno).toBeDefined();
        expect(disciplinaAlunoCriacaoDto.codigoAluno).toBe(disciplinaAluno.codigoAluno);
        expect(disciplinaAlunoCriacaoDto.codigoDisciplina).toBe(disciplinaAluno.codigoDisciplina);
        expect(disciplinaAlunoCriacaoDto.situacao).toBe(disciplinaAluno.situacao)

    })

})