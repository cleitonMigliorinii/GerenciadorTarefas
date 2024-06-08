import { UsuarioCriacaoDto } from "../../src/models/usuario/data/entity/usuario";
import { UsuarioRepository } from "../../src/models/usuario/data/repository/UsuarioRepository";
import { BuscarUsuarioPorNomeUseCase, BuscarUsuarioPorRAUseCase, BuscarUsuarioPorTurmaUseCase } from "../../src/models/usuario/domain/useCases/BuscarUsuarioUseCase"; 
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("Busca de Usuario", () => {

    let buscarUsuarioPorNomeUseCase : BuscarUsuarioPorNomeUseCase;
    let buscarUsuarioPorRAUseCase : BuscarUsuarioPorRAUseCase
    let buscarUsuarioPorTurmaUseCase : BuscarUsuarioPorTurmaUseCase
    let salvarUsuarioUseCase: SalvarUsuarioUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const usuarioRepository = new UsuarioRepository();
        buscarUsuarioPorRAUseCase = new BuscarUsuarioPorRAUseCase(usuarioRepository)
        buscarUsuarioPorNomeUseCase = new BuscarUsuarioPorNomeUseCase(usuarioRepository)
        buscarUsuarioPorTurmaUseCase = new BuscarUsuarioPorTurmaUseCase(usuarioRepository)
        salvarUsuarioUseCase = new SalvarUsuarioUseCase(usuarioRepository)
        fakeService = FakeDataService();
    })

    it('Buscar USUARIO por RA', async () => {

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

        const usuarioBusca = await buscarUsuarioPorRAUseCase.execute(usuario.RA);

        expect(usuarioBusca).toBeDefined();

        expect(usuario.RA).toBe(usuarioBusca!.RA)
        expect(usuario.nomeUsuario).toBe(usuarioBusca!.nomeUsuario)
    })

    it('verificar USUARIO não encontrado por RA', async () => {
        const RA = '99999';
        
        const nomeBusca = await buscarUsuarioPorRAUseCase.execute(RA);

        expect(nomeBusca).toBeNull();
    });

    it('Buscar USUARIO por nome', async () => {

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

        const usuarioBusca = await buscarUsuarioPorNomeUseCase.execute(usuario.nomeUsuario);

        expect(usuarioBusca).toBeDefined();

        const usuarioBuscaIsValid = () => {
            if (usuarioBusca) {
                for (const user of usuarioBusca) {
                    
                    if (usuario.nomeUsuario != user.nomeUsuario) {
                        return false
                    }
                }
                return true
            }
        }

        const valid = usuarioBuscaIsValid()

        expect(true).toBe(valid)
    })

    it('verificar USUARIO não encontrado por nome', async () => {
        const nome = '99999';
        
        const nomeBusca = await buscarUsuarioPorNomeUseCase.execute(nome);

        expect(nomeBusca).toEqual([]);
    });

    it('Buscar USUARIO por turma', async () => {

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

        const usuarioBusca = await buscarUsuarioPorTurmaUseCase.execute(usuario.turmaID);

        expect(usuarioBusca).toBeDefined();

        const usuarioBuscaIsValid = () => {
            if (usuarioBusca) {
                for (const user of usuarioBusca) {
                    
                    if (usuario.turmaID != user.turmaID) {
                        return false
                    }
                }
                return true
            }
        }

        const valid = usuarioBuscaIsValid()

        expect(true).toBe(valid)
    })

    it('verificar USUARIO não encontrado por turma', async () => {
        const RA = '99999';
        
        const nomeBusca = await buscarUsuarioPorTurmaUseCase.execute(RA);

        expect(nomeBusca).toEqual([]);
    });

})