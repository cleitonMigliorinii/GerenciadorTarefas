import fastify from "fastify";
import {z} from "zod";


const app = fastify()

app.get('/usuarios/:id', (request, reply) => {

    //Objeto referencia para validação
    const validParms = z.object({id: z.string()})

    //Validando com o objeto referencia criado
    const paramsValidado = validParms.parse(request.params)

    console.log(paramsValidado);

    return "Estamos na listagem de usuario"

})

app.post('/criarUsuario', (request, reply) => {

    //Objeto referencia para validação
    const validBody = z.object({id: z.number(), nome : z.string()})

    //Validando com o objeto referencia criado
    const bodyValidado = validBody.parse(request.body)

    console.log(bodyValidado)

    return reply.status(201).send("Usuario Criado")
})

app.listen({port: 3333}).then(() =>{
    console.log("Servidor está rodando")
})



