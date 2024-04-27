import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { SalvarIesUseCase } from "../domain/useCases/SalvarIesUseCase";
import { IesRepository } from "../data/repository/IesRepository";
import { IesCriacaoDto } from "../data/entity/Ies";

export const iesControllers = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) =>{

    const iesRepository = new IesRepository();
    const salvarIesUseCase = new SalvarIesUseCase(iesRepository);

    fastify.post('/salvarIes', async (request, reply) =>{

        try{

            const ies = await salvarIesUseCase.execute(request.body as IesCriacaoDto);
            reply.code(201).send(ies);

        }catch(error){
            reply.code(500).send({error: 'Houve algum problema ao salvar'})
        }

    })

    done();


}