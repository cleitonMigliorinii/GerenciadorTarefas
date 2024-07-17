import { Tarefa } from "@prisma/client";
import { TarefaCriacaoDto, TarefaUpdateDto } from "../entity/Tarefa";
import prisma from "../../../../config/database";

export interface TarefaRepositoryInterface {
  salvar(tarefa: TarefaCriacaoDto): Promise<Tarefa>;
  buscarPorId(codigo: number): Promise<Tarefa | null>;
  buscarPorDisciplina(disciplinaId: number): Promise<Tarefa[]>;
  alterar(codigo: number, tarefa: TarefaUpdateDto): Promise<Tarefa>;
  deletar(codigo: number): Promise<void>;
}

export class TarefaRepository implements TarefaRepositoryInterface {
  async salvar(tarefa: TarefaCriacaoDto): Promise<Tarefa> {
    try {
      const tarefaCriada = await prisma.tarefa.create({
        data: {
          disciplina: tarefa.disciplina,
          disciplinaId: tarefa.disciplinaId,
          situacao: tarefa.situacao,
          descricao: tarefa.descricao,
          data_prevista: tarefa.data_prevista,
          data_registro: new Date(),
          data_alteracao: new Date()
        }
      });
      console.log('Tarefa criada', tarefaCriada);
      return tarefaCriada;
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao salvar tarefa');
    }
  }

  async buscarPorId(codigo: number): Promise<Tarefa | null> {
    try {
      return await prisma.tarefa.findUnique({
        where: { codigo }
      });
    } catch (error) {
      throw new Error("Problema ao buscar tarefa");
    }
  }

  async buscarPorDisciplina(disciplinaId: number): Promise<Tarefa[]> {
    try {
      return await prisma.tarefa.findMany({
        where: { disciplinaId }
      });
    } catch (error) {
      throw new Error("Problema ao buscar tarefas por disciplina");
    }
  }

  async alterar(codigo: number, tarefa: TarefaUpdateDto): Promise<Tarefa> {
    try {
      return await prisma.tarefa.update({
        where: { codigo },
        data: {
          ...tarefa,
          data_alteracao: new Date()
        }
      });
    } catch (error) {
      throw new Error("Problema ao alterar tarefa");
    }
  }

  async deletar(codigo: number): Promise<void> {
    try {
      await prisma.tarefa.delete({
        where: { codigo }
      });
    } catch (error) {
      throw new Error("Problema ao deletar tarefa");
    }
  }

  async listarTodasTarefas(): Promise<Tarefa[]> {
    try {
      return await prisma.tarefa.findMany();
    } catch (error) {
      throw new Error("Problema ao listar tarefas");
    }
  }
}
