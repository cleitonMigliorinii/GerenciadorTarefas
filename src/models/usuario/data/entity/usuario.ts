export interface Usuario {
    RA: string;
    nomeUsuario: string;
    senhaUsuario: string;
    emailUsuario: string;
    telefoneUsuario: string;
    tipoUsuario: string;
    turmaUsuario: string;
    situacaoUsuario: Boolean;
    dataAlteracaoUsuario?: Date;
}
export interface UsuarioCriacaoDto {
    RA: string;
    nomeUsuario: string;
    senhaUsuario: string;
    emailUsuario: string;
    telefoneUsuario: string;
    tipoUsuario: string;
    turmaUsuario: string;
    situacaoUsuario: boolean;
    dataAlteracaoUsuario?: Date;
}

export interface UsuarioAtualizacaoDto {
    nomeUsuario?: string;
    senhaUsuario?: string;
    emailUsuario?: string;
    telefoneUsuario?: string;
    tipoUsuario?: string;
    turmaUsuario?: string;
    situacaoUsuario?: boolean;
    dataAlteracaoUsuario: Date;
}