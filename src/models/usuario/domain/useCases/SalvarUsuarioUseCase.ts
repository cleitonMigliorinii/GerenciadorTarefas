import { UsuarioRepository } from "../../data/repository/UsuarioRepository";
import { UsuarioCriacaoDto } from "../../data/entity/Usuario";

export class SalvarUsuarioUseCase{

    constructor(private usuarioRepository: UsuarioRepository){}

    async execute(usuario: UsuarioCriacaoDto){
        try {

            return await this.usuarioRepository.salvarUsuario(usuario);
            
        } catch (error) {
            throw new Error("Problema ao criar Usuario")
        }
    }

}