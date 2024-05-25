import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { turmaControllers } from "../controllers/turmaController";


export const turmaRoutes = (fastify: FastifyInstance, options: RouteShorthandOptions, done: () => void) => {

    fastify.register(turmaControllers)
    done();
}

