import { IesCriacaoDto } from "../../src/models/ies/data/entity/Ies";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository";
import { BuscarCNPJUseCase } from "../../src/models/ies/domain/useCases/BuscarCNPJUseCase";
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { FakeDataService } from "../../src/service/iesFake.data.service";

describe("Busca de IES", () => {

    let buscarCNPJUseCase : BuscarCNPJUseCase;
    let salvarIesUseCase: SalvarIesUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const iesRepository = new IesRepository();
        buscarCNPJUseCase = new BuscarCNPJUseCase(iesRepository)
        salvarIesUseCase = new SalvarIesUseCase(iesRepository)
        fakeService = FakeDataService();
    })

    it('Buscar ies por CNPJ', async () => {

        const iesCriacaoDto: IesCriacaoDto = {
            nome: fakeService.username,
            cnpj: fakeService.cnpj
        }
        const ies = await salvarIesUseCase.execute(iesCriacaoDto);

        const iesBusca = await buscarCNPJUseCase.execute(ies.cnpj);

        expect(iesBusca).toBeDefined();
        expect(ies.codigo).toBe(iesBusca!.codigo)
        expect(ies.nome).toBe(iesBusca!.nome)
        expect(ies.cnpj).toBe(iesBusca!.cnpj)
    })

    it('verificar IES não encontrada', async () => {

        const cnpj = '99999'
        const iesBusca = await buscarCNPJUseCase.execute(cnpj);

        expect(iesBusca).toBeNull();

    })


})