import { UsuarioRepository } from "../../data/repository/UsuarioRepository"; 
import { UsuarioAtualizacaoDto } from "../../data/entity/Usuario";
import { Usuario } from "@prisma/client";

export class AlterarUsuarioUseCase{

    constructor(private usuarioRepository: UsuarioRepository){}

    async execute(RA: string, usuarioUpdate: UsuarioAtualizacaoDto): Promise<Usuario>{
        try {

            return await this.usuarioRepository.alterarUsuario(RA, usuarioUpdate)

        } catch (error) {
            throw new Error("Problema ao atualizar USUARIO")
        }
    }

}