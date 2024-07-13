import { Ies } from "../../../ies/data/entity/Ies";


export interface Turma{
    codigo: string;
    nome: string;
    dataCriacao: Date;
    dataInicioPeriodo: Date;
    dataFinalPeriodo: Date;
    ies: Ies
}

export interface TurmaCriacaoDto{
    
    nome: string;
    dataInicioPeriodo: Date;
    dataFinalPeriodo: Date;
    iesCodigo: string
 
}
export interface TurmaUpdateDto{
    
    nome?: string;
    dataInicioPeriodo?: Date;
    dataFinalPeriodo?: Date;
    iesCodigo?: string
    
}
