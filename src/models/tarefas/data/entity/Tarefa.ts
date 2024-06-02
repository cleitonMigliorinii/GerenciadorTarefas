// Entidade Tarefa
export interface Tarefa {
    codigo: number;
    disciplina: string;
    dataRegistro: Date;
    situacao: string;
    dataAlteracao: Date;
    descricao: string;
    dataPrevista: Date;
}

// DTO para criação de Tarefa
export interface TarefaCriacaoDto {
    disciplina: string;
    situacao: string;
    descricao: string;
    dataPrevista: Date;
}

// DTO para atualização de Tarefa
export interface TarefaUpdateDto {
    disciplina?: string;
    situacao?: string;
    descricao?: string;
    dataPrevista?: Date;
}

