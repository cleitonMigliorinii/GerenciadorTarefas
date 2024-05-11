import { IesCriacaoDto, IesUpdateDto } from "../../src/models/ies/data/entity/Ies";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository"
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { UpdateUseCase } from "../../src/models/ies/domain/useCases/UpdateUseCase";
import { FakeDataService } from "../../src/service/iesFake.data.service";

describe("AlteraçãoIesTest",  () => {

    let alterarIesUseCase : UpdateUseCase;
    let salvarIesUseCase : SalvarIesUseCase;
    let fakeService: any

    beforeEach( () => {

        const iesRepository = new IesRepository();
        alterarIesUseCase = new UpdateUseCase(iesRepository)
        fakeService = FakeDataService();
    })

    it('Alterar ies Cadastrada', async () => {
        
        const iesCriacaoDto: IesCriacaoDto = {
            nome: fakeService.username,
            cnpj:fakeService.cnpj,
    
        }
    
        const ies = await salvarIesUseCase.execute(iesCriacaoDto);

        
        const iesUpdateDto : IesUpdateDto = {
            nome: "UPDATE IES"
        }

        const iesUpdate  = await alterarIesUseCase.execute(ies.codigo, iesUpdateDto);

        expect(iesUpdate).toBeDefined();
        expect(iesUpdate.codigo).toBe(ies.codigo);
        expect(iesUpdate.cnpj).toBe(ies.cnpj);
        expect(iesUpdate.nome).toBe(iesUpdateDto.nome);

    })
})