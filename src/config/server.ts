import fastify from "fastify";
import { iesRoutes } from "../models/ies/routes/iesRoutes";
import { usuarioRoutes } from "../models/usuario/routes/usuarioRoutes";

const server = fastify()
const PORT = 3333;

server.register(iesRoutes)
server.register(usuarioRoutes)

server.get('/', (request, reply) => {
    return { message: 'Você está na API da CESUL' }
})

server.listen({ port: PORT }).then(() => {
    console.log("Servidor está rodando na porta " + PORT)
})