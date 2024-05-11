export interface UsuarioCriacaoDto {
    RA: string;
    nomeUsuario: string;
    senhaUsuario: String;
    emailUsuario: String;
    telefoneUsuario: String;
    tipoUsuario: String;
    turmaUsuario: String;
    dataRegistroUsuario: Date;
    situacaoUsuario: Boolean;
    dataAlteracaoUsuario: Date;
}

export interface UsuarioAtualizacaoDto {
    RA: string;
    nomeUsuario?: string;
    senhaUsuario?: String;
    emailUsuario: String;
    telefoneUsuario?: String;
    tipoUsuario: String;
    turmaUsuario?: String;
    dataRegistroUsuario: Date;
    situacaoUsuario?: Boolean;
    dataAlteracaoUsuario: Date;
}