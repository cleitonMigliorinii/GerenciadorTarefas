import { Usuario } from "@prisma/client";
import { UsuarioCriacaoDto, UsuarioAtualizacaoDto} from "../entity/usuario" 
import prisma from "../../../../config/database";

export interface UsuarioRepositoryInterface{
    salvarUsuario(usuario: UsuarioCriacaoDto): Promise<Usuario>
}
export class UsuarioRepository implements UsuarioRepositoryInterface{

    async salvarUsuario(usuario: UsuarioCriacaoDto): Promise<Usuario>{
        try {
        
            const usuarioCriado = await prisma.usuario.create({
                data: usuario
            })

            return usuarioCriado

        } catch (error) {
            throw new Error('Falha ao salvar USUARIO');
        }

    }

    async buscarUsuarioPorRA(RA: string): Promise<Usuario | null>{
        try{
            return await prisma.usuario.findUnique({
                where: {RA}
            })
        }catch(error){
            throw new Error("Problema ao buscar USUARIO")
        }
    }

    async buscarUsuarioPorNome(nomeUsuario: string): Promise<Usuario[] | null>{
        try{
            return await prisma.usuario.findMany({
                where: {nomeUsuario}
            })
        }catch(error){
            throw new Error("Problema ao buscar USUARIO")
        }
    }

    async buscarUsuarioPorTurma(turmaCodigo: string): Promise<Usuario[] | null>{
        try{
            return await prisma.usuario.findMany({
                where: {turmaCodigo}
            })
        }catch(error){
            throw new Error("Problema ao buscar USUARIO")
        }
    }

    async alterarUsuario(RA: string, usuario: UsuarioAtualizacaoDto): Promise<Usuario>{
        try{
            return await prisma.usuario.update({
                where: {RA},
                data: usuario
            })
        }catch(error){
            throw new Error("Problema ao alterar USUARIO")
        }
    }

    async deletarUsuario(RA: string): Promise<void>{
        try{
            await prisma.usuario.delete({
                where: {RA}
            })
        }catch(error){
            throw new Error("Problema ao deletar USUARIO")
        }
    }

    async listAllUsers(): Promise<Usuario[] | null>{
        try{
            return await prisma.usuario.findMany();

        }catch(error){
            throw new Error("Problema ao buscar USUARIO")
        }
    }




}