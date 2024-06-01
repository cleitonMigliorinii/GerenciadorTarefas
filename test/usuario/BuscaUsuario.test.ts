import { UsuarioCriacaoDto } from "../../src/models/usuario/data/entity/Usuario";
import { UsuarioRepository } from "../../src/models/usuario/data/repository/UsuarioRepository";
import { BuscarUsuarioPorNomeUseCase } from "../../src/models/usuario/domain/useCases/BuscarUsuarioUseCase"; 
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("Busca de Usuario", () => {

    let buscarUsuarioPorNomeUseCase : BuscarUsuarioPorNomeUseCase;
    let salvarUsuarioUseCase: SalvarUsuarioUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const usuarioRepository = new UsuarioRepository();
        buscarUsuarioPorNomeUseCase = new BuscarUsuarioPorNomeUseCase(usuarioRepository)
        salvarUsuarioUseCase = new SalvarUsuarioUseCase(usuarioRepository)
        fakeService = FakeDataService();
    })

    it('Buscar USUARIO por nome', async () => {

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

    it('verificar USUARIO não encontrado', async () => {
        const nome = '99999';
        
        const nomeBusca = await buscarUsuarioPorNomeUseCase.execute(nome);

        expect(nomeBusca).toEqual([]);
    });


})