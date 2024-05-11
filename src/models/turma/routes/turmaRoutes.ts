import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { turmaControllers } from "../controllers/turmaController";


export const iesRoutes = (fastify: FastifyInstance, options: RouteShorthandOptions, done: () => void) => {

    fastify.register(turmaControllers)
    done();
}

