import { UsuarioCriacaoDto } from "../../src/models/usuario/data/entity/Usuario";
import { UsuarioRepository } from "../../src/models/usuario/data/repository/UsuarioRepository";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe('SalvarIes', () => {

    let salvarUsuarioUseCase: SalvarUsuarioUseCase;
    let fakeService: any;

    beforeEach(() => {
        const usuarioRepository = new UsuarioRepository();
        salvarUsuarioUseCase = new SalvarUsuarioUseCase(usuarioRepository);
        fakeService = FakeDataService();
    })

    it('teste de criação de novo Usuario', async () => {

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

        expect(usuario).toBeDefined();
        expect(usuario.RA).toBeDefined();
        expect(usuarioCriacaoDto.nomeUsuario).toBe(usuario.nomeUsuario);
        expect(usuarioCriacaoDto.senhaUsuario).toBe(usuario.senhaUsuario);
        expect(usuarioCriacaoDto.emailUsuario).toBe(usuario.emailUsuario);
        expect(usuarioCriacaoDto.telefoneUsuario).toBe(usuario.telefoneUsuario);
        expect(usuarioCriacaoDto.tipoUsuario).toBe(usuario.tipoUsuario);
        expect(usuarioCriacaoDto.turmaUsuario).toBe(usuario.turmaUsuario);
        expect(usuarioCriacaoDto.situacaoUsuario).toBe(usuario.situacaoUsuario);

    })

    it('teste de criação no mesmo EMAIL', async () =>{

        const email = fakeService.email;
        let usuarioCriacaoDto: UsuarioCriacaoDto = {
            RA: fakeService.RA,
            nomeUsuario: fakeService.nome,
            senhaUsuario: fakeService.senha,
            emailUsuario: fakeService.email,
            telefoneUsuario: fakeService.telefone,
            tipoUsuario: fakeService.tipoUser,
            turmaUsuario: fakeService.turma,
            situacaoUsuario: fakeService.situacao
        }
    
        await salvarUsuarioUseCase.execute(usuarioCriacaoDto);
    
        usuarioCriacaoDto.nomeUsuario = 'Usuario Fraude'
    
        try{
            const usuario = await salvarUsuarioUseCase.execute(usuarioCriacaoDto)
            expect(usuario).toBeUndefined();
        } catch(error: any){
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Problema ao criar Usuario");
        }
    })

})