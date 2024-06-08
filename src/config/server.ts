import fastify from "fastify";
import { iesRoutes } from "../models/ies/routes/iesRoutes";
import { disciplinaRoutes } from "../models/disciplina/routes/disciplinaRoutes";

import { turmaRoutes } from "../models/turma/routes/turmaRoutes";
import { tarefaRoutes } from "../models/tarefas/routes/tarefasRoutes";
import { usuarioRoutes } from "../models/usuario/routes/usuarioRoutes";

const server = fastify()
const PORT = 3333;

server.register(iesRoutes)
server.register(disciplinaRoutes)
server.register(tarefaRoutes);
server.register(usuarioRoutes);
server.register(turmaRoutes)


server.get('/', (request, reply) => {
    return { message: 'Você está na API da CESUL' }
})

server.listen({ port: PORT }).then(() => {
    console.log("Servidor está rodando na porta " + PORT)
})
