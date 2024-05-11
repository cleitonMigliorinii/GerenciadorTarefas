import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import { CadastrarTurmaUseCase } from "../../src/models/turma/domain/useCases/CadastrarTurmaUseCase";


describe('CadastrarTurma', () =>{

    let CadastrarTurmaUseCaseTurmaUseCase: CadastrarTurmaUseCase;
    let fakeService: any;

    beforeEach(()=>{
        const turmaRepository = new TurmaRepository();
        salvarTurmaUseCase = new SalvarTurmaUseCase(TurmaRepository);
        fakeService = FakeDataService();
    })

    it('teste de criação de nova Turma', async () => {

    const TurmaCriacaoDto: TurmaCriacaoDto = {
        nome: fakeService.username,
        cnpj:fakeService.cnpj,

    }

    console.log("Username: " + FakeDataService().username);

    const Turma = await salvarTurmaUseCase.execute(TurmaCriacaoDto);

    expect(Turma).toBeDefined();
    expect(Turma.codigo).toBeDefined();
    expect(Turma.nome).toBe(TurmaCriacaoDto.nome);
    expect(Turma.cnpj).toBe(TurmaCriacaoDto.cnpj);

    })

    it ('teste de criação no mesmo CNPJ', async () => {

        const cnpj = fakeService.cnpj;
        let TurmaTest: TurmaCriacaoDto = {
            nome: 'Test 1',
            cnpj
        }

        await salvarTurmaUseCase.execute(TurmaTest);
            
        TurmaTest.nome = 'Usuario Fralde'

        try {
            await salvarTurmaUseCase.execute(TurmaTest);
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Problema ao cadastrar Turma")
        }
    })


})