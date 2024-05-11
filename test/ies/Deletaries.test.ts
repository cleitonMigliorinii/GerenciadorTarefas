import { IesCriacaoDto } from "../../src/models/ies/data/entity/Ies";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository";
import { BuscarCNPJUseCase } from "../../src/models/ies/domain/useCases/BuscarCNPJUseCase";
import { DeleteUseCase } from "../../src/models/ies/domain/useCases/DeleteUseCase";
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { FakeDataService } from "../../src/service/fake.data.service";

describe("DeletarIesTest", () =>{

    let deleteUseCase : DeleteUseCase;
    let buscarCNPJUseCase : BuscarCNPJUseCase;
    let salvarIesUseCase: SalvarIesUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const iesRepository = new IesRepository();
        deleteUseCase = new DeleteUseCase(iesRepository)
        buscarCNPJUseCase = new BuscarCNPJUseCase(iesRepository)
        salvarIesUseCase = new SalvarIesUseCase(iesRepository)
        fakeService = FakeDataService();
    })

    it('deletar ies cadastrada', async () => {

        const iesCriacaoDto: IesCriacaoDto = {
            nome: fakeService.username,
            cnpj: fakeService.cnpj
        }
        const ies = await salvarIesUseCase.execute(iesCriacaoDto);

        expect(ies).toBeDefined()

        await deleteUseCase.execute(ies.codigo);
        
        const iesRetorno = await deleteUseCase.execute(ies.cnpj);
        expect(iesRetorno).toBeNull();
    })





})