import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { usuarioControllers } from "../controllers/UsuarioControllers";

export const usuarioRoutes = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) =>{
    fastify.register(usuarioControllers)
    done();
}