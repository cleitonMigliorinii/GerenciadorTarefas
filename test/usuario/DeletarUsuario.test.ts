import { UsuarioCriacaoDto, UsuarioAtualizacaoDto } from "../../src/models/usuario/data/entity/Usuario";
import { UsuarioRepository } from "../../src/models/usuario/data/repository/UsuarioRepository";
import { BuscarUsuarioPorNomeUseCase } from "../../src/models/usuario/domain/useCases/BuscarUsuarioUseCase";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { DeletarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/DeletarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("DeletarUsuarioTest", () =>{

    let deletarUsuarioUseCase : DeletarUsuarioUseCase;
    let buscarUsuarioPorCnpjUseCase : BuscarUsuarioPorNomeUseCase;
    let salvarUsuarioUseCase: SalvarUsuarioUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const usuarioRepository = new UsuarioRepository();
        deletarUsuarioUseCase = new DeletarUsuarioUseCase(usuarioRepository)
        buscarUsuarioPorCnpjUseCase = new BuscarUsuarioPorNomeUseCase(usuarioRepository)
        salvarUsuarioUseCase = new SalvarUsuarioUseCase(usuarioRepository)
        fakeService = FakeDataService();
    })

    it('deletar Usuario cadastrada', async () => {

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

        const Usuario = await salvarUsuarioUseCase.execute(usuarioCriacaoDto);

        expect(Usuario).toBeDefined()

        await deletarUsuarioUseCase.execute(Usuario.RA);
        
        const UsuarioRetorno = await buscarUsuarioPorCnpjUseCase.execute(Usuario.RA);
        expect(UsuarioRetorno).toEqual([]);
    })





})