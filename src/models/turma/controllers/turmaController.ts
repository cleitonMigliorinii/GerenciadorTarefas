import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { CadastrarTurmaUseCase } from "../domain/useCase/CadastrarTurmaUseCase";
import { TurmaCriacaoDto } from "../data/entity/Turma";
import { TurmaRepository } from "../data/repository/turmaRepository";


export const turmaControllers = (fastify: FastifyInstance, options: RouteShorthandOptions, done: () => void) => {

    const turmaRepository = new TurmaRepository();
    const cadastrarTurmaUseCase = new CadastrarTurmaUseCase(turmaRepository);

    fastify.post('/salvarTurma', async (request, reply) => {

        try {
            
            const turma = await cadastrarTurmaUseCase.execute(request.body as TurmaCriacaoDto);
            reply.code(201).send(turma);
>>>>>>> c408df8f145bf5ba7039e1f47833b54d1881a02a

        } catch (error) {
            reply.code(500).send({error: "Houve algum problema ao salvar"})
        }
    })
<<<<<<< HEAD

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

=======
>>>>>>> c408df8f145bf5ba7039e1f47833b54d1881a02a
}