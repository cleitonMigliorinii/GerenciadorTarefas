import { DisciplinaCriacaoDto } from "../../data/entity/Disciplina";
import { DisciplinaRepository } from "../../data/repository/DisciplinaRepository";

export class SalvarDisciplinaUseCase {

    constructor(private disciplinaRepository: DisciplinaRepository) { }

    async execute(disciplina: DisciplinaCriacaoDto) {
        try {

            const disciplinaCriada = await this.disciplinaRepository.salvarDisciplina(disciplina);
            return disciplinaCriada;

        } catch (error) {
            throw new Error("Problema ao criar disciplina")
        }
    }

}