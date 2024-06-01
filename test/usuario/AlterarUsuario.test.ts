import { UsuarioCriacaoDto, UsuarioAtualizacaoDto } from "../../src/models/usuario/data/entity/Usuario";
import { UsuarioRepository } from "../../src/models/usuario/data/repository/UsuarioRepository"
import { AlterarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/AlterarUsuarioUseCase";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("AlteracaoUsuarioTest", () =>{

    let alterarUsuarioUseCase : AlterarUsuarioUseCase;
    let salvarUsuarioUseCase: SalvarUsuarioUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const usuarioRepository = new UsuarioRepository();
        alterarUsuarioUseCase = new AlterarUsuarioUseCase(usuarioRepository)
        salvarUsuarioUseCase = new SalvarUsuarioUseCase(usuarioRepository)
        fakeService = FakeDataService();
    })

    it('Alterar usuario cadastrado', async () => {

        const usuarioCriacaoDto: UsuarioCriacaoDto = {
            RA: fakeService.RA,
            nomeUsuario: fakeService.nome,
            senhaUsuario: fakeService.senha,
            emailUsuario: fakeService.email,
            telefoneUsuario: fakeService.telefone,
            tipoUsuario: fakeService.tipoUser,
            turmaUsuario: fakeService.turma,
            situacaoUsuario: fakeService.situacao
        }

        const usuario = await salvarUsuarioUseCase.execute(usuarioCriacaoDto);

        const usuarioAtualizacaoDto : UsuarioAtualizacaoDto = {
            nomeUsuario: fakeService.nome+" UPDATE",
            emailUsuario: fakeService.email,
            dataAlteracaoUsuario: new Date(),
        }

        const usuarioUpdate = 
            await alterarUsuarioUseCase.execute(usuario.RA, usuarioAtualizacaoDto);

        expect(usuarioUpdate).toBeDefined()
        expect(usuarioUpdate.RA).toBe(usuario.RA)
        expect(usuarioUpdate.nomeUsuario).toBe(usuarioAtualizacaoDto.nomeUsuario);
    })





})