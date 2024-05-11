import { UpdateUseCase } from "../../src/models/ies/domain/useCases/UpdateUseCase";
import { TurmaCriacaoDto, TurmaUpdateDto } from "../../src/models/turma/data/entity/Turma";
import { TurmaRepository } from "../../src/models/turma/data/repository/turmaRepository";
import { UpdateTurmaUseCase } from "../../src/models/turma/domain/useCases/UpdateTurmaUseCase";
import { FakeDataService } from "../../src/service/iesFake.data.service";

describe("AlteraçãoTurmaTest",  () => {

    let alterarTurmaUseCase : UpdateTurmaUseCase;
    let salvarTurmaUseCase : SalvarTurmaUseCase;
    let fakeService: any

    beforeEach( () => {

        const turmaRepository = new TurmaRepository();
        alterarTurmaUseCase = new UpdateUseCase(turmaRepository)
        fakeService = FakeDataService();
    })

    it('Alterar turma Cadastrada', async () => {
        
        const turmaCriacaoDto: TurmaCriacaoDto = {
            nome: fakeService.username,
            dataCriacao: fakeService.dataCriacao,
    
        }
    
        const turma = await salvarTurmaUseCase.execute(turmaCriacaoDto);

        
        const turmaUpdateDto : TurmaUpdateDto = {
            nome: "UPDATE IES"
        }

        const iesUpdate  = await alterarTurmaUseCase.execute(turma.codigo, turmaUpdateDto);

        expect(iesUpdate).toBeDefined();
        expect(iesUpdate.codigo).toBe(ies.codigo);
        expect(iesUpdate.cnpj).toBe(ies.cnpj);
        expect(iesUpdate.nome).toBe(iesUpdateDto.nome);

    })
})