import { IesCriacaoDto, IesUpdateDto } from "../../src/models/ies/data/entity/Ies";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository"
import { AlterarIesUseCase } from "../../src/models/ies/domain/useCases/AlterarIesUseCase";
import { BuscarIesPorCnpjUseCase } from "../../src/models/ies/domain/useCases/BuscarIesPorCnpjUseCase";
import { DeletarIesUseCase } from "../../src/models/ies/domain/useCases/DeletarIesUseCase";
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { FakeDataService } from "../../src/services/fake.data.service";

describe("DeletarIesTest", () =>{

    let deletarIesUseCase : DeletarIesUseCase;
    let buscarIesPorCnpjUseCase : BuscarIesPorCnpjUseCase;
    let salvarIesUseCase: SalvarIesUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const iesRepository = new IesRepository();
        deletarIesUseCase = new DeletarIesUseCase(iesRepository)
        buscarIesPorCnpjUseCase = new BuscarIesPorCnpjUseCase(iesRepository)
        salvarIesUseCase = new SalvarIesUseCase(iesRepository)
        fakeService = FakeDataService();
    })

    it('deletar ies cadastrada', async () => {

        const iesCriacaoDto: IesCriacaoDto = {
            nome: fakeService.empresa,
            cnpj: fakeService.cnpj
        }
        const ies = await salvarIesUseCase.execute(iesCriacaoDto);

        expect(ies).toBeDefined()

        await deletarIesUseCase.execute(ies.codigo);
        
        const iesRetorno = await buscarIesPorCnpjUseCase.execute(ies.cnpj);
        expect(iesRetorno).toBeNull();
    })





})