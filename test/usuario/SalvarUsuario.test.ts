import { IesCriacaoDto } from "../../src/models/ies/data/entity/Ies";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository";
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { TurmaCriacaoDto } from "../../src/models/turma/data/entity/Turma";
import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import { CadastrarTurmaUseCase } from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase";
import { UsuarioCriacaoDto } from "../../src/models/usuario/data/entity/usuario";
import { UsuarioRepository } from "../../src/models/usuario/data/repository/UsuarioRepository";
import { SalvarUsuarioUseCase } from "../../src/models/usuario/domain/useCases/SalvarUsuarioUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe('SalvarIes', () => {

    let salvarUsuarioUseCase: SalvarUsuarioUseCase;
    let cadastrarTurmaUseCase: CadastrarTurmaUseCase;
    let salvarIesUseCase: SalvarIesUseCase;
    let fakeService: any;

    beforeEach(() => {
        const usuarioRepository = new UsuarioRepository();
        
        salvarUsuarioUseCase = new SalvarUsuarioUseCase(usuarioRepository);
        cadastrarTurmaUseCase = new CadastrarTurmaUseCase(new TurmaRepository());
        salvarIesUseCase = new SalvarIesUseCase(new IesRepository())
        fakeService = FakeDataService();
    })

    it('teste de criação de novo Usuario', async () => {

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

        expect(usuario).toBeDefined();
        expect(usuario.RA).toBeDefined();
        expect(usuarioCriacaoDto.nomeUsuario).toBe(usuario.nomeUsuario);
        expect(usuarioCriacaoDto.senhaUsuario).toBe(usuario.senhaUsuario);
        expect(usuarioCriacaoDto.emailUsuario).toBe(usuario.emailUsuario);
        expect(usuarioCriacaoDto.telefoneUsuario).toBe(usuario.telefoneUsuario);
        expect(usuarioCriacaoDto.tipoUsuario).toBe(usuario.tipoUsuario);
        expect(usuarioCriacaoDto.situacaoUsuario).toBe(usuario.situacaoUsuario);
        expect(usuarioCriacaoDto.turmaCodigo).toBe(usuario.turmaCodigo);

    })

    it('teste de criação no mesmo EMAIL', async () =>{

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

        const email = fakeService.email;
        let usuarioCriacaoDto: UsuarioCriacaoDto = {
            RA: fakeService.RA,
            nomeUsuario: fakeService.nome,
            senhaUsuario: fakeService.senha,
            emailUsuario: fakeService.email,
            telefoneUsuario: fakeService.telefone,
            tipoUsuario: fakeService.tipoUser,
            situacaoUsuario: fakeService.situacao,
            turmaCodigo: turma.codigo
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