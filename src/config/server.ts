import fastify from "fastify";
import { iesRoutes } from "../models/ies/routes/iesRoutes";
import { tarefaRoutes } from "../models/tarefas/routes/tarefasRoutes";

const server = fastify()
const PORT = 3333;

server.register(iesRoutes);
server.register(tarefaRoutes);

server.get('/', (request, reply) => {
    return { message : 'Você está na API da CESUL' }
})

server.listen({port: PORT}).then(() =>{
    console.log("Servidor está rodando na porta " + PORT)
})



