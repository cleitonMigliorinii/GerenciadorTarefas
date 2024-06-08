import { UsuarioRepository } from "../../data/repository/UsuarioRepository"

export class DeletarUsuarioUseCase{

    constructor(private usuarioRepository: UsuarioRepository){}

    async execute(RA: string){
        try {

            await this.usuarioRepository.deletarUsuario(RA)

        } catch (error) {
            throw new Error("Problema ao deletar USUARIO")
        }
    }

}