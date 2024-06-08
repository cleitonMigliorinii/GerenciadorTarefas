import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { SalvarIesUseCase } from "../domain/useCases/SalvarIesUseCase";
import { IesRepository } from "../data/repository/IesRepository";
import { IesCriacaoDto, IesUpdateDto } from "../data/entity/Ies";

import { UUID } from "crypto";
import { BuscarIesPorCnpjUseCase } from "../domain/useCases/BuscarIesPorCnpjUseCase";
import { AlterarIesUseCase } from "../domain/useCases/AlterarIesUseCase";
import { DeletarIesUseCase } from "../domain/useCases/DeletarIesUseCase";
import { ListarTodasIesUseCase } from "../domain/useCases/ListarTodasIesUseCase";

export const iesControllers = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) => {

    const iesRepository = new IesRepository();
    const salvarIesUseCase = new SalvarIesUseCase(iesRepository);
    const buscarIesPorCnpjUseCase = new BuscarIesPorCnpjUseCase(iesRepository)
    const alterarIesUseCase = new AlterarIesUseCase(iesRepository);
    const deletarIesUseCase = new DeletarIesUseCase(iesRepository)
    const listarIes = new ListarTodasIesUseCase(iesRepository)

    fastify.post('/salvarIes', async (request, reply) => {
        try {

            const ies = await salvarIesUseCase.execute(request.body as IesCriacaoDto);
            reply.code(201).send(ies);

        } catch (error) {
            reply.code(500).send({ error: 'Houve algum problema ao salvar' })
        }

    })

    fastify.get('/buscarIes/:cnpj', async (request: any, reply) => {

        try {
            console.log(request.params.cnpj)

            const cnpj = request.params.cnpj;
            const ies = buscarIesPorCnpjUseCase.execute(cnpj);

            if (ies) {
                reply.code(200).send(ies)
            } else {
                reply.code(404).send({ erro: 'Ies não encontrada' })
            }
        } catch (error) {
            reply.code(500).send({ erro: 'Erro de servidor' })
        }


    })

    fastify.put('/alterarIes/:codigo', async (request, reply) => {

        try {
            const codigo = request.params.codigo as UUID;
            const iesAlterar = request.body as IesUpdateDto;

            const iesAlterada =
                await alterarIesUseCase.execute(codigo, iesAlterar)

            reply.code(200).send(iesAlterada)

        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao alterar' })
        }


    })

    fastify.delete('/deletarIes/:codigo', async (request, reply) => {

        try {
            const codigo = request.params.codigo as UUID;
            await deletarIesUseCase.execute(codigo)

            reply.code(204).send("Deletado com sucesso ")

        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao deletar' })
        }

    })

    fastify.get('/listarTodasIes', async (request, reply) => {

        try {

            reply.code(200).send(await listarIes.execute())

        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao deletar' })
        }

    })


    done();


}