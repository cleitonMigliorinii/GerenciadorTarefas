import { UsuarioCriacaoDto, UsuarioAtualizacaoDto } from "../../src/models/usuario/data/entity/usuario";
import { UsuarioRepository } from "../../src/models/usuario/data/repository/UsuarioRepository";
import { BuscarUsuarioPorRAUseCase } from "../../src/models/usuario/domain/useCases/BuscarUsuarioUseCase";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { DeletarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/DeletarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";
import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository";
import { CadastrarTurmaUseCase } from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase";
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { TurmaCriacaoDto } from "../../src/models/turma/data/entity/Turma";
import { IesCriacaoDto } from "../../src/models/ies/data/entity/Ies";

describe("DeletarUsuarioTest", () =>{

    let deletarUsuarioUseCase : DeletarUsuarioUseCase;
    let buscarUsuarioPorRAUseCase : BuscarUsuarioPorRAUseCase;
    let salvarUsuarioUseCase: SalvarUsuarioUseCase; 
    let cadastrarTurmaUseCase: CadastrarTurmaUseCase;
    let salvarIesUseCase: SalvarIesUseCase;
    let fakeService: any;

    beforeEach( ()=>{
        const usuarioRepository = new UsuarioRepository();
        deletarUsuarioUseCase = new DeletarUsuarioUseCase(usuarioRepository)
        buscarUsuarioPorRAUseCase = new BuscarUsuarioPorRAUseCase(usuarioRepository)
        salvarUsuarioUseCase = new SalvarUsuarioUseCase(usuarioRepository)
        cadastrarTurmaUseCase = new CadastrarTurmaUseCase(new TurmaRepository());
        salvarIesUseCase = new SalvarIesUseCase(new IesRepository())
        fakeService = FakeDataService();
    })

    it('deletar Usuario cadastrada', async () => {
        
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

        const Usuario = await salvarUsuarioUseCase.execute(usuarioCriacaoDto);

        expect(Usuario).toBeDefined()

        await deletarUsuarioUseCase.execute(Usuario.RA);
        
        const usuarioRetorno = await buscarUsuarioPorRAUseCase.execute(Usuario.RA);
        expect(usuarioRetorno).toBeNull();
    })





})