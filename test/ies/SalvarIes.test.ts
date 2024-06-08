import { IesCriacaoDto } from "../../src/models/ies/data/entity/Ies";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository"
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe('SalvarIes', () => {

    let salvarIesUseCase: SalvarIesUseCase;
    let fakeService: any;

    beforeEach(() => {
        //Sempre antes do teste vai rodar esse bloco
        const iesRepository = new IesRepository();
        salvarIesUseCase = new SalvarIesUseCase(iesRepository);
        fakeService = FakeDataService();
    })

    it('teste de criação de nova Ies', async () => {

        const iesCriacaoDto: IesCriacaoDto = {
            nome: fakeService.empresa,
            cnpj: fakeService.cnpj
        }

        const ies = await salvarIesUseCase.execute(iesCriacaoDto);

        expect(ies).toBeDefined();
        expect(ies.codigo).toBeDefined();
        expect(iesCriacaoDto.nome).toBe(ies.nome);
        expect(iesCriacaoDto.cnpj).toBe(ies.cnpj);

    })

    it('teste de criação no mesmo CNPJ', async () =>{

        const cnpj = fakeService.cnpj;
        let iesTest: IesCriacaoDto = {
            nome : fakeService.empresa,
            cnpj
        } 

        await salvarIesUseCase.execute(iesTest);

        iesTest.nome = 'Usuario Fralde'

        try{
            const ies = await salvarIesUseCase.execute(iesTest)
            expect(ies).toBeUndefined();
        }catch(error: any){
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Problema ao criar IES")
        }
    })

})