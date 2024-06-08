import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { UsuarioRepository } from "../data/repository/UsuarioRepository";
import { UsuarioCriacaoDto, UsuarioAtualizacaoDto } from "../data/entity/usuario";

import { SalvarUsuarioUseCase } from "../domain/useCases/SalvarUsuarioUseCase";
import { BuscarUsuarioPorRAUseCase, BuscarUsuarioPorNomeUseCase, BuscarUsuarioPorTurmaUseCase } from "../domain/useCases/BuscarUsuarioUseCase";
import { AlterarUsuarioUseCase } from "../domain/useCases/AlterarUsuarioUseCase";
import { DeletarUsuarioUseCase } from "../domain/useCases/DeletarUsuarioUseCase";

export const usuarioControllers = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) =>{

    const usuarioRepository = new UsuarioRepository();
    const salvarUsuarioUseCase = new SalvarUsuarioUseCase(usuarioRepository);
    const buscarUsuarioPorRAUseCase = new BuscarUsuarioPorRAUseCase(usuarioRepository)
    const buscarUsuarioPorNomeUseCase = new BuscarUsuarioPorNomeUseCase(usuarioRepository)
    const buscarUsuarioPorTurmaUseCase = new BuscarUsuarioPorTurmaUseCase(usuarioRepository)
    const alterarUsuarioUseCase = new AlterarUsuarioUseCase(usuarioRepository);
    const deletarUsuarioUseCase = new DeletarUsuarioUseCase(usuarioRepository);

    fastify.post('/salvarUsuario', async (request, reply) =>{
        try{

            const usuario = await salvarUsuarioUseCase.execute(request.body as UsuarioCriacaoDto);
            reply.code(201).send(usuario);

        }catch(error){
            reply.code(500).send({error: 'Houve algum problema ao salvar'})
        }

    })

    fastify.get('/buscarUsuario/:ra', async (request: any, reply) => {

        try{
            const ra = request.params.ra;
            const usuario =  buscarUsuarioPorRAUseCase.execute(ra);

            if(usuario){
                reply.code(200).send(usuario)
            }else{
                reply.code(404).send({erro: 'USUARIO não encontrado'})
            }
        }catch(error){
            reply.code(500).send({erro: 'Erro de servidor'})
        }


    })

    fastify.get('/buscarUsuario/nome/:nome', async (request: any, reply) => {

        try{
            const nome = decodeURIComponent(request.params.nome);
            const usuario =  buscarUsuarioPorNomeUseCase.execute(nome);

            if(usuario){
                reply.code(200).send(usuario)
            }else{
                reply.code(404).send({erro: 'USUARIO não encontrado'})
            }
        }catch(error){
            reply.code(500).send({erro: 'Erro de servidor'})
        }


    })

    fastify.get('/buscarUsuario/turma/:turmaID', async (request: any, reply) => {

        try {
            const turmaID = request.params.turmaID
            const usuario = buscarUsuarioPorTurmaUseCase.execute(turmaID);

            if (usuario){
                reply.code(200).send(usuario)
            }else{
                reply.code(404).send({erro: "USUARIOS não encontrados"})
            }
        }catch(error){
            reply.code(500).send({erro: 'Erro de servidor'})
        }

    }) 

    fastify.put('/alterarUsuario/:ra', async (request: any, reply) => {
        
        try{
            const RA = request.params.ra;
            const usuarioAlterar = request.body as UsuarioAtualizacaoDto;

            const usuarioAlterado = 
                await alterarUsuarioUseCase.execute(RA, usuarioAlterar)
            
            reply.code(200).send(usuarioAlterado)

        }catch(error){
            reply.code(500).send({erro: 'Problema ao alterar USUARIO'})
        }


    })

    fastify.delete('/deletarUsuario/:ra', async (request: any, reply) => {
        
        try {
            const RA = request.params.ra;
            await deletarUsuarioUseCase.execute(RA)

            reply.code(204).send("Deletado com sucesso ")

        } catch (error) {
            reply.code(500).send({erro: 'Problema ao deletar USUARIO'})
        }

    })


    done();


}