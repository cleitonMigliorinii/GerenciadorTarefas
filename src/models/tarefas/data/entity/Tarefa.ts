// Entidade Tarefa
export interface Tarefa {
    codigo: number;
    disciplina: string;
    disciplinaId: number;
    dataRegistro: Date;
    situacao: string;
    dataAlteracao: Date;
    descricao: string;
    dataPrevista: Date;
}

// DTO para criação de Tarefa
export interface TarefaCriacaoDto {
    disciplina: string;
    disciplinaId: number;
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

export interface Disciplina {
    id: number;
    nome: string;
    descricao: string;
    // Outras propriedades relevantes para a disciplina
}


