import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { disciplinaControllers } from "../controllers/DisciplinaController";

export const disciplinaRoutes = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) => {
    fastify.register(disciplinaControllers)
    done();
}