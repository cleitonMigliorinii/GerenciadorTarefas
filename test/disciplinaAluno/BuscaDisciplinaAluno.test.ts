
import { DisciplinaCriacaoDto } from "../../src/models/disciplina/data/entity/Disciplina";
import { SalvarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/SalvarUseCase";
import { DisciplinaAlunoCriacaoDto } from "../../src/models/disciplinaAluno/data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../src/models/disciplinaAluno/data/repository/disciplinaAlunoRepository";
import { BuscarDisciplinaAlunoPorDisciplinaUseCase } from "../../src/models/disciplinaAluno/domain/useCase/BuscarDisciplinaAlunoPorDisciplinaUseCase";
import { SalvarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/SalvarDisciplinaAlunoUseCase";
import { UsuarioCriacaoDto } from "../../src/models/usuario/data/entity/usuario";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("BuscarDisciplinaAlunoTest", () => { 

    let buscarDisciplinaAlunoPorDisciplinaUseCase : BuscarDisciplinaAlunoPorDisciplinaUseCase;
    let salvarDisciplinaAlunoUseCase: SalvarDisciplinaAlunoUseCase;
    let salvarDisciplinaUseCase: SalvarDisciplinaUseCase;
    let salvarUsuarioUseCase: SalvarUsuarioUseCase;
    let fakeService: any;

    beforeEach( ()=>{
        const disciplinaAlunoRepository = new DisciplinaAlunoRepository();
        buscarDisciplinaAlunoPorDisciplinaUseCase = new BuscarDisciplinaAlunoPorDisciplinaUseCase(disciplinaAlunoRepository)
        salvarDisciplinaAlunoUseCase = new SalvarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        fakeService = FakeDataService();
    })

    it('Buscar alunos por codigo de disciplina', async () => {

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

        const disciplinaAlunoBusca = await buscarDisciplinaAlunoPorDisciplinaUseCase.execute(disciplinaAluno.codigoDisciplina);

        expect(disciplinaAluno).toBeDefined();

     })

    it('verificar vinculo não encontrado', async () => {

        const codigoDisciplina = '000'
        const disciplinaAlunoBusca = await buscarDisciplinaAlunoPorDisciplinaUseCase.execute(codigoDisciplina);

        expect(disciplinaAlunoBusca).toEqual([])

    })


})