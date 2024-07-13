import { DisciplinaCriacaoDto } from "../../src/models/disciplina/data/entity/Disciplina";
import { SalvarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/SalvarUseCase";
import { DisciplinaAlunoCriacaoDto } from "../../src/models/disciplinaAluno/data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../src/models/disciplinaAluno/data/repository/disciplinaAlunoRepository";
import { SalvarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/SalvarDisciplinaAlunoUseCase";
import { UsuarioCriacaoDto } from "../../src/models/usuario/data/entity/usuario";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe('SalvarDisciplinaAluno', () => {

    let salvarDisciplinaAlunoUseCase: SalvarDisciplinaAlunoUseCase;
    let salvarDisciplinaUseCase: SalvarDisciplinaUseCase;
    let salvarUsuarioUseCase: SalvarUsuarioUseCase;
    let fakeService: any;

    beforeEach(() => {
        //Sempre antes do teste vai rodar esse bloco
        const disciplinaAlunoRepository = new DisciplinaAlunoRepository();
        salvarDisciplinaAlunoUseCase = new SalvarDisciplinaAlunoUseCase(disciplinaAlunoRepository);
        fakeService = FakeDataService();
    })

    it('teste de vinculação de aluno com nova disciplina', async () => {

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

        expect(disciplinaAluno).toBeDefined();
        expect(disciplinaAlunoCriacaoDto.codigoAluno).toBe(disciplinaAluno.codigoAluno);
        expect(disciplinaAlunoCriacaoDto.codigoDisciplina).toBe(disciplinaAluno.codigoDisciplina);
        expect(disciplinaAlunoCriacaoDto.situacao).toBe(disciplinaAluno.situacao)

    })

})