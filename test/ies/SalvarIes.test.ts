import { exec } from "child_process";
import { IesCriacaoDto } from "../../src/models/ies/data/entity/Ies";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository"
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { FakeDataService } from "../../src/service/fake.data.service";


describe('SalvarIes', () =>{

    let salvarIesUseCase: SalvarIesUseCase;
    let fakeService: any;

    beforeEach(()=>{
        const iesRepository = new IesRepository();
        salvarIesUseCase = new SalvarIesUseCase(iesRepository);
        fakeService = FakeDataService();
    })

    it('teste de criação de nova Ies', async () => {

    const iesCriacaoDto: IesCriacaoDto = {
        nome: fakeService.username,
        cnpj:fakeService.cnpj,

    }

    console.log("Username: " + FakeDataService().username);

    const ies = await salvarIesUseCase.execute(iesCriacaoDto);

    expect(ies).toBeDefined();
    expect(ies.codigo).toBeDefined();
    expect(ies.nome).toBe(iesCriacaoDto.nome);
    expect(ies.cnpj).toBe(iesCriacaoDto.cnpj);

    })

    it ('teste de criação no mesmo CNPJ', async () => {

        const cnpj = fakeService.cnpj;
        let iesTest: IesCriacaoDto = {
            nome: 'Test 1',
            cnpj
        }

        await salvarIesUseCase.execute(iesTest);
            
        iesTest.nome = 'Usuario Fralde'

        try {
            await salvarIesUseCase.execute(iesTest);
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Problema ao cadastrar IES")
        }
    })


})