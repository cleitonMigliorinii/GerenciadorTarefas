import { Turma } from "@prisma/client";

export interface Usuario {
    RA: string;
    nomeUsuario: string;
    senhaUsuario: string;
    emailUsuario: string;
    telefoneUsuario: string;
    tipoUsuario: string;
    situacaoUsuario: Boolean;
    dataAlteracaoUsuario?: Date;
    turma: Turma

}
export interface UsuarioCriacaoDto {
    RA: string;
    nomeUsuario: string;
    senhaUsuario: string;
    emailUsuario: string;
    telefoneUsuario: string;
    tipoUsuario: string;
    situacaoUsuario: boolean;
    dataAlteracaoUsuario?: Date;
    turmaCodigo: string;
}

export interface UsuarioAtualizacaoDto {
    nomeUsuario?: string;
    senhaUsuario?: string;
    emailUsuario?: string;
    telefoneUsuario?: string;
    tipoUsuario?: string;
    situacaoUsuario?: boolean;
    dataAlteracaoUsuario: Date;
    turmaCodigo: string;
}