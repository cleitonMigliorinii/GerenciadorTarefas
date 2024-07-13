
import { DisciplinaCriacaoDto } from "../../src/models/disciplina/data/entity/Disciplina";
import { SalvarDisciplinaUseCase } from "../../src/models/disciplina/domain/useCases/SalvarUseCase";
import { DisciplinaAlunoCriacaoDto, DisciplinaAlunoUpdateDto } from "../../src/models/disciplinaAluno/data/entity/disciplinaAluno";
import { DisciplinaAlunoRepository } from "../../src/models/disciplinaAluno/data/repository/disciplinaAlunoRepository";
import { AlterarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/AlterarDisciplinaAlunoUseCase";
import { SalvarDisciplinaAlunoUseCase } from "../../src/models/disciplinaAluno/domain/useCase/SalvarDisciplinaAlunoUseCase";
import { AlterarIesUseCase } from "../../src/models/ies/domain/useCases/AlterarIesUseCase";
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { UsuarioCriacaoDto } from "../../src/models/usuario/data/entity/usuario";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("AlteracaoDisciplinaAlunoTest", () =>{

    let alterarDisciplinaAlunoUseCase : AlterarDisciplinaAlunoUseCase;
    let salvarDisciplinaAlunoUseCase: SalvarDisciplinaAlunoUseCase; 
    let salvarDisciplinaUseCase: SalvarDisciplinaUseCase;
    let salvarUsuarioUseCase: SalvarUsuarioUseCase;
    let fakeService: any;

    beforeEach( ()=>{
        const disciplinaAlunoRepository = new DisciplinaAlunoRepository();
        alterarDisciplinaAlunoUseCase = new AlterarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        salvarDisciplinaAlunoUseCase = new SalvarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
        fakeService = FakeDataService();
    })

    it('Alterar vinculo aluno -> disciplina cadastrado', async () => {

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