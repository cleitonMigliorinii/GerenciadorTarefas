import prisma from "../../../../config/database";
import { UsuarioCriacaoDto, UsuarioAtualizacaoDto } from "../../domain/dto/UsuarioDto";
import { usuario } from "@prisma/client";

export interface UsuarioRepositoryInterface{

}

export class UsuarioRepository implements UsuarioRepositoryInterface {

    async salvarUsuario(usuario: UsuarioCriacaoDto): Promise<usuario> {

        try {

            const usuarioCriado = await prisma.usuario.create({
                data: usuario
            })

            return usuarioCriado
                
        }
        catch (error) {
            throw new Error ("Falha ao salvar usuario");
        }

    }
}