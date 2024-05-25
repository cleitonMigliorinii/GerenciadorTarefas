import { DisciplinaCriacaoDto } from "../../data/entity/Disciplina";
import { DisciplinaRepository } from "../../data/repository/DisciplinaRepository";

export class SalvarDisciplinaUseCase {

    constructor(private disciplinaRepository: DisciplinaRepository) { }

    async execute(disciplina: DisciplinaCriacaoDto) {
        try {

            return await this.disciplinaRepository.salvarDisciplina(disciplina);

        } catch (error) {
            console.log(error)
            throw new Error("Problema ao criar disciplina")
        }
    }

}