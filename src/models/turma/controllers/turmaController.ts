import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { TurmaRepository } from "../data/repository/turmaRepository";
import { TurmaCriacaoDto } from "../data/entity/Turma";
import { BuscaTurmaUseCase } from "../domain/useCases/BuscarTurmaUseCase";
import { UpdateTurmaUseCase } from "../domain/useCases/UpdateTurmaUseCase";
import { DeleteTurmaUseCase } from "../domain/useCases/DeletarTurmaUseCase";


export const iesControllers = (fastify: FastifyInstance, options: RouteShorthandOptions, done: () => void) => {

    const turmaRepository = new TurmaRepository();
    const salvarUseCase = new SalvarTurma(turmaRepository);
    const buscaUseCase = new BuscaTurmaUseCase(turmaRepository);
    const updateUseCase = new UpdateTurmaUseCase(turmaRepository);
    const deleteUseCase = new DeleteTurmaUseCase(turmaRepository);

    fastify.post('/salvarIes', async (request, reply) => {

        try {
            
            const ies = await salvarTurmaUseCase.execute(request.body as TurmaCriacaoDto);
            reply.code(201).send(ies);

        } catch (error) {
            reply.code(500).send({error: "Houve algum problema ao salvar"})
        }
    })

    fastify.get('/buscarIes/:codigo', async (request, reply) => {

        try {
            
            const codigo = request.params.codigo as UUID;
            const ies = await buscaCodUseCase.execute(codigo);

            if(ies){
                reply.code(200).send(ies)
            }else{
                reply.code(404).send({error: "Ies não encontrada"})
            }
           
        } catch (error) {
            
        }
    })

    fastify.get('/buscarIesCnpj/:cnpj', async (request, reply) => {

        try {
            
            const cnpj = request.params.cnpj;
            const ies = await buscarCNPJUseCase.execute(cnpj);

            if(ies){
                reply.code(200).send(ies)
            }else{
                reply.code(404).send({error: "Ies não encontrada"})
            }
        } catch (error) {
            
        }
    })
    fastify.put('/alterarIes/:codigo', async (request, reply) => {

        try {
            
            const codigo = request.params.codigo as UUID;
            const iesAlterar = request.body as IesUpdateDto;

            const ies = await updateUseCase.execute(codigo, iesAlterar);
            
            reply.code(200).send(ies)
            
        } catch (error) {
            reply.code(500).send({error: "Erro ao alterar Ies"})
        }
    })
    fastify.delete('/apagarIes/:codigo', async (request, reply) => {

        try {
            
            const codigo = request.params.codigo as UUID;
            await deleteUseCase.execute(codigo);

            reply.code(204).send("Deletedado com sucesso")
            
           
        } catch (error) {
            reply.code(404).send({error: "Erro ao apagar Ies"})
        }
    })

    done();

}