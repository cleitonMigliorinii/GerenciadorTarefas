import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { request } from "http";
import { SalvarIesUseCase } from "../domain/useCases/SalvarIesUseCase";
import { IesRepository } from "../data/repository/IesRepository";
import { IesCriacaoDto, IesUpdateDto } from "../data/entity/Ies";
import { UUID } from "crypto";

import { BuscarCNPJUseCase } from "../domain/useCases/BuscarCNPJUseCase";
import { UpdateUseCase } from "../domain/useCases/UpdateUseCase";
import { DeleteUseCase } from "../domain/useCases/DeleteUseCase";
import { BuscaCodUseCase } from "../domain/useCases/BuscaCodUseCase";

export const iesControllers = (fastify: FastifyInstance, options: RouteShorthandOptions, done: () => void) => {

    const iesRepository = new IesRepository();
    const salvarIesUseCase = new SalvarIesUseCase(iesRepository);

    const buscaCodUseCase = new BuscaCodUseCase(iesRepository);
    const buscarCNPJUseCase = new BuscarCNPJUseCase(iesRepository);
    const updateUseCase = new UpdateUseCase(iesRepository);
    const deleteUseCase = new DeleteUseCase(iesRepository);

    fastify.post('/salvarIes', async (request, reply) => {

        try {
            
            const ies = await salvarIesUseCase.execute(request.body as IesCriacaoDto);
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