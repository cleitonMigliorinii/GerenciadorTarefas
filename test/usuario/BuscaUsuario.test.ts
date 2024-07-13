import { IesCriacaoDto } from "../../src/models/ies/data/entity/Ies";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository";
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { TurmaCriacaoDto } from "../../src/models/turma/data/entity/Turma";
import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import { CadastrarTurmaUseCase } from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase";
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
    let cadastrarTurmaUseCase: CadastrarTurmaUseCase;
    let salvarIesUseCase: SalvarIesUseCase;
    let fakeService: any;

    beforeEach( ()=>{
        const usuarioRepository = new UsuarioRepository();
        buscarUsuarioPorRAUseCase = new BuscarUsuarioPorRAUseCase(usuarioRepository)
        buscarUsuarioPorNomeUseCase = new BuscarUsuarioPorNomeUseCase(usuarioRepository)
        buscarUsuarioPorTurmaUseCase = new BuscarUsuarioPorTurmaUseCase(usuarioRepository)
        salvarUsuarioUseCase = new SalvarUsuarioUseCase(usuarioRepository)
        cadastrarTurmaUseCase = new CadastrarTurmaUseCase(new TurmaRepository());
        salvarIesUseCase = new SalvarIesUseCase(new IesRepository())
        fakeService = FakeDataService();
    })

    it('Buscar USUARIO por RA', async () => {

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

        const usuarioBusca = await buscarUsuarioPorTurmaUseCase.execute(usuario.turmaCodigo);

        expect(usuarioBusca).toBeDefined();

        const usuarioBuscaIsValid = () => {
            if (usuarioBusca) {
                for (const user of usuarioBusca) {
                    
                    if (usuario.turmaCodigo != user.turmaCodigo) {
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