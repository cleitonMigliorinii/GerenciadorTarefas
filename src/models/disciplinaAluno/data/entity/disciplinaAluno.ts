export interface DisciplinaAluno {
    codigo: string;
    codigoAluno: string;
    codigoDisciplina: string;
    dataRegistro : Date;
    situacao: string;
}

export interface DisciplinaAlunoCriacaoDto {
    codigoAluno: string;
    codigoDisciplina: string;
    situacao: string;
}

export interface DisciplinaAlunoUpdateDto {
    situacao: string;
}
