import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { SalvarTarefaUseCase } from "../domain/useCases/SalvarTarefaUseCase";
import { AlterarTarefaUseCase } from "../domain/useCases/AlterarTarefaUseCase";
import { DeletarTarefaUseCase } from "../domain/useCases/DeletarTarefaUseCase";
import { BuscarTarefaPorIdUseCase } from "../domain/useCases/BuscarTarefaPorIdUseCase";
import { TarefaRepository } from "../data/repository/TarefaRepository";
import { TarefaCriacaoDto, TarefaUpdateDto } from "../data/entity/Tarefa";

export const tarefaControllers = (
    fastify: FastifyInstance,
    options: RouteShorthandOptions,
    done: () => void
) => {
    const tarefaRepository = new TarefaRepository();
    const salvarTarefaUseCase = new SalvarTarefaUseCase(tarefaRepository);
    const alterarTarefaUseCase = new AlterarTarefaUseCase(tarefaRepository);
    const deletarTarefaUseCase = new DeletarTarefaUseCase(tarefaRepository);
    const buscarTarefaPorIdUseCase = new BuscarTarefaPorIdUseCase(tarefaRepository);

    fastify.post('/tarefas', async (request, reply) => {
        try {
            const tarefa = await salvarTarefaUseCase.execute(request.body as TarefaCriacaoDto);
            reply.code(201).send(tarefa);
        } catch (error) {
            reply.code(500).send({ error: 'Houve algum problema ao salvar' });
        }
    });

    fastify.get('/tarefas/:codigo', async (request: any, reply) => {
        try {
            const codigo = parseInt(request.params.codigo);
            const tarefa = await buscarTarefaPorIdUseCase.execute(codigo);

            if (tarefa) {
                reply.code(200).send(tarefa);
            } else {
                reply.code(404).send({ erro: 'Tarefa não encontrada' });
            }
        } catch (error) {
            reply.code(500).send({ erro: 'Erro de servidor' });
        }
    });

    fastify.put('/tarefas/:codigo', async (request, reply) => {
        try {
            const codigo = parseInt(request.params.codigo);
            const tarefaAtualizada = request.body as TarefaUpdateDto;

            const tarefa = await alterarTarefaUseCase.execute(codigo, tarefaAtualizada);
            reply.code(200).send(tarefa);
        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao alterar' });
        }
    });

    fastify.delete('/tarefas/:codigo', async (request, reply) => {
        try {
            const codigo = parseInt(request.params.codigo);
            await deletarTarefaUseCase.execute(codigo);

            reply.code(204).send("Deletado com sucesso");
        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao deletar' });
        }
    });

    done();
}

