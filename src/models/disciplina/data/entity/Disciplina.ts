export interface Disciplina {
    codigo: string;
    nome: string;
    professor: string;
    coordenador: string;
    dataRegistro: Date;
    dataAlteracao: Date;
  }
  
  export interface DisciplinaCriacaoDto {
    nome: string;
    professor: string;
    coordenador: string;
  }
  
  export interface DisciplinaUpdateDto {
    nome?: string;
    professor?: string;
    coordenador?: string;
    dataAlteracao: Date;
  }