

export interface Turma{

    codigo: string;
    nome: string;
    dataCriacao: Date;
    dataInicioPeriodo: Date;
    dataFinalPeriodo: Date;
    codigoIes: string;
}

export interface TurmaCriacaoDto{
    
    nome: string;
    dataInicioPeriodo: Date;
    dataFinalPeriodo: Date;
    codigoIes: string;
 
}
export interface TurmaUpdateDto{
    
    nome?: string;
    dataInicioPeriodo?: Date;
    dataFinalPeriodo?: Date;
    codigoIes?: string;
    
}
