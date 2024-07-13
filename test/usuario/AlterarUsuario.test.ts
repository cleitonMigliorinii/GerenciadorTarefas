import { IesCriacaoDto } from "../../src/models/ies/data/entity/Ies";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository";
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { TurmaCriacaoDto } from "../../src/models/turma/data/entity/Turma";
import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import { CadastrarTurmaUseCase } from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase";
import { UsuarioCriacaoDto, UsuarioAtualizacaoDto } from "../../src/models/usuario/data/entity/usuario";
import { UsuarioRepository } from "../../src/models/usuario/data/repository/UsuarioRepository"
import { AlterarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/AlterarUsuarioUseCase";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("AlteracaoUsuarioTest", () =>{

    let alterarUsuarioUseCase : AlterarUsuarioUseCase;
    let salvarUsuarioUseCase: SalvarUsuarioUseCase;
    let cadastrarTurmaUseCase: CadastrarTurmaUseCase;
    let salvarIesUseCase: SalvarIesUseCase;
    let fakeService: any;

    beforeEach( ()=>{
        const usuarioRepository = new UsuarioRepository();
        alterarUsuarioUseCase = new AlterarUsuarioUseCase(usuarioRepository)
        salvarUsuarioUseCase = new SalvarUsuarioUseCase(usuarioRepository)
        cadastrarTurmaUseCase = new CadastrarTurmaUseCase(new TurmaRepository());
        salvarIesUseCase = new SalvarIesUseCase(new IesRepository())
        fakeService = FakeDataService();
    })

    it('Alterar usuario cadastrado', async () => {

        const iesCriacaoDto: IesCriacaoDto = {
            nome: fakeService.empresa,
            cnpj: fakeService.cnpj
        }

        const ies = await salvarIesUseCase.execute(iesCriacaoDto);

        const turmaCriacaoDto: TurmaCriacaoDto = {
            nome: fakeService.username,
            dataInicioPeriodo: fakeService.dataInicioPeriodo,
            dataFinalPeriodo: fakeService.dataFinalPeriodo,
            iesCodigo: ies.codigo
        };

        const turma = await cadastrarTurmaUseCase.execute(turmaCriacaoDto);

        const usuarioCriacaoDto: UsuarioCriacaoDto = {
            RA: fakeService.RA,
            nomeUsuario: fakeService.nome,
            senhaUsuario: fakeService.senha,
            emailUsuario: fakeService.email,
            telefoneUsuario: fakeService.telefone,
            tipoUsuario: fakeService.tipoUser,
            situacaoUsuario: fakeService.situacao,
            turmaCodigo: turma.codigo
        }

        const usuario = await salvarUsuarioUseCase.execute(usuarioCriacaoDto);

        const usuarioAtualizacaoDto : UsuarioAtualizacaoDto = {
            nomeUsuario: fakeService.nome + " UPDATE",
            emailUsuario: fakeService.email,
            dataAlteracaoUsuario: new Date(),
            turmaCodigo: turma.codigo
        }

        const usuarioUpdate = 
            await alterarUsuarioUseCase.execute(usuario.RA, usuarioAtualizacaoDto);

        expect(usuarioUpdate).toBeDefined()
        expect(usuarioUpdate.RA).toBe(usuario.RA)
        expect(usuarioUpdate.nomeUsuario).toBe(usuarioAtualizacaoDto.nomeUsuario);
    })

})