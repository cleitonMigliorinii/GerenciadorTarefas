// Entidade Tarefa
export interface Tarefa {
    codigo: number;
    disciplina: string;
    disciplinaId: number;
    data_registro: Date;
    situacao: string;
    data_alteracao: Date;
    descricao: string;
    data_prevista: Date;
}

// DTO para criação de Tarefa
export interface TarefaCriacaoDto {
    disciplina: string;
    disciplinaId: number;
    situacao: string;
    descricao: string;
    data_prevista: Date | string;
}

// DTO para atualização de Tarefa
export interface TarefaUpdateDto {
    disciplina?: string;
    situacao?: string;
    descricao?: string;
    data_prevista?: Date;
}

export interface Disciplina {
    id: number;
    nome: string;
    descricao: string;
    // Outras propriedades relevantes para a disciplina
}


