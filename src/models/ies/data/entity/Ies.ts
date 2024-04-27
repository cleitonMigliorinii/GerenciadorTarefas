export interface Ies {
    codigo: number;
    nome: string;
    dataCriacao : Date;
    cnpj: string;
}

export interface IesCriacaoDto {
    nome: string;
    cnpj: string;
}