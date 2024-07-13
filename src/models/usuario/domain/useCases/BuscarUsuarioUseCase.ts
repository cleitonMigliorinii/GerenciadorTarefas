

import { UsuarioRepository } from "../../data/repository/UsuarioRepository";
import { Usuario } from "@prisma/client";

export class BuscarUsuarioPorRAUseCase {
    
    constructor(private usuarioRepository: UsuarioRepository){}

    async execute(RA: string): Promise<Usuario | null> {
        try {

            return await this.usuarioRepository.buscarUsuarioPorRA(RA)

        } catch (error) {
            throw new Error("Problema ao buscar USUARIO por RA")
        }
    }

}


export class BuscarUsuarioPorNomeUseCase{

    constructor(private usuarioRepository: UsuarioRepository){}

    async execute(nome: string): Promise<Usuario[] | null> {
        try {

            return await this.usuarioRepository.buscarUsuarioPorNome(nome)

        } catch (error) {
            throw new Error("Problema ao buscar USUARIO por nome")
        }
    }

}

export class BuscarUsuarioPorTurmaUseCase{

    constructor(private usuarioRepository: UsuarioRepository){}

    async execute(turmaCodigo: string): Promise<Usuario[] | null> {
        try {

            return await this.usuarioRepository.buscarUsuarioPorTurma(turmaCodigo)

        } catch {
            throw new Error("Problema ao buscar USUARIO por turma")
        }
    }

}