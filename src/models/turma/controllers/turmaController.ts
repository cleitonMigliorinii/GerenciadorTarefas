import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { CadastrarTurmaUseCase } from "../domain/useCases/CadastrarTurmaUseCase";
import { TurmaCriacaoDto } from "../data/entity/Turma";
import { TurmaRepository } from "../data/repository/turmaRepository";


export const turmaControllers = (fastify: FastifyInstance, options: RouteShorthandOptions, done: () => void) => {

    const turmaRepository = new TurmaRepository();
    const cadastrarTurmaUseCase = new CadastrarTurmaUseCase(turmaRepository);

    fastify.post('/salvarTurma', async (request, reply) => {

        try {
            
            const turma = await cadastrarTurmaUseCase.execute(request.body as TurmaCriacaoDto);
            reply.code(201).send(turma);

        } catch (error) {
            reply.code(500).send({error: "Houve algum problema ao salvar"})
        }
    })
}