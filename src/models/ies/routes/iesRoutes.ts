import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { iesControllers } from "../controllers/IesControllers";

export const iesRoutes = (fastify: FastifyInstance, options: RouteShorthandOptions, done: () => void) => {

    fastify.register(iesControllers)
    done();
}

