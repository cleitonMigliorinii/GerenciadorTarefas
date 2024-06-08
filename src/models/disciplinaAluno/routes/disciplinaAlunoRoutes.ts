import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { disciplinaAlunoControllers } from "../controllers/DisciplinaAlunoControllers";


export const disciplinaAlunoRoutes = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void) => {
        fastify.register(disciplinaAlunoControllers)
        done();
    }
