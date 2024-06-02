import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { tarefaControllers } from "../controllers/TarefaController";

export const tarefaRoutes = (
    fastify: FastifyInstance,
    options: RouteShorthandOptions,
    done: () => void
) => {
    fastify.register(tarefaControllers);
    done();
}

