import { UUID } from "crypto";
import { Tarefa } from "../../../tarefas/data/entity/Tarefa";
import { Usuario } from "../../../usuario/data/entity/usuario";

export interface TarefaAluno{

    codigo: string;
    nota:number;
    dataCriacao: Date;
    dataAlteracao: Date;
    tarefa: Tarefa;
    tarefaCodigo:number; 
    usuarioRA:String;
    usuario:Usuario
    
}

export interface TarefaAlunoCriacaoDto{
    
    nota:number;
    tarefaCodigo:number; 
    usuarioRA:String;
    
}
export interface TarefaAlunoUpdateDto{
    nota:number;

}