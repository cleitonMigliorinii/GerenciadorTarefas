import fastify from "fastify";

const server = fastify()
const PORT = 3333;

server.get('/', (request, reply) => {
    return { message : 'Você está na API da CESUL' }
})

server.listen({port: PORT}).then(() =>{
    console.log("Servidor está rodando na porta " + PORT)
})



