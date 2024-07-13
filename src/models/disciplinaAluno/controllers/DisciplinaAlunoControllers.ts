import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { DisciplinaAlunoRepository } from "../data/repository/disciplinaAlunoRepository";
import { SalvarDisciplinaAlunoUseCase } from "../domain/useCase/SalvarDisciplinaAlunoUseCase";
import { BuscarDisciplinaAlunoPorAlunoUseCase } from "../domain/useCase/BuscarDisciplinaAlunoPorAlunoUseCase";
import { BuscarDisciplinaAlunoPorDisciplinaUseCase } from "../domain/useCase/BuscarDisciplinaAlunoPorDisciplinaUseCase";
import { AlterarDisciplinaAlunoUseCase } from "../domain/useCase/AlterarDisciplinaAlunoUseCase";
import { DeletarDisciplinaAlunoUseCase } from "../domain/useCase/DeletarDisciplinaAlunoUseCase";
import { DisciplinaAlunoCriacaoDto } from "../data/entity/disciplinaAluno";
import { ListarDisciplinaAlunoUseCase } from "../domain/useCase/ListarDisciplinaAlunoUseCase";
import { request } from "http";
 
export const disciplinaAlunoControllers = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) =>{

    const disciplinaAlunoRepository = new DisciplinaAlunoRepository();
    const salvarDisciplinaAlunoUseCase = new SalvarDisciplinaAlunoUseCase(disciplinaAlunoRepository);
    const buscarDisciplinaAlunoPorAlunoUseCase = new BuscarDisciplinaAlunoPorAlunoUseCase(disciplinaAlunoRepository);
    const buscarDisciplinaAlunoPorDisciplinaUseCase = new BuscarDisciplinaAlunoPorDisciplinaUseCase(disciplinaAlunoRepository);
    const alterarDisciplinaAlunoUseCase = new AlterarDisciplinaAlunoUseCase(disciplinaAlunoRepository);
    const deletarDisciplinaAlunoUseCase = new DeletarDisciplinaAlunoUseCase(disciplinaAlunoRepository)
    const listarDisciplinaAluno = new ListarDisciplinaAlunoUseCase(disciplinaAlunoRepository)

    fastify.post('/salvarDisciplinaAluno', async (request, reply) =>{
        try{

            const disciplinaAluno = await salvarDisciplinaAlunoUseCase.execute(request.body as DisciplinaAlunoCriacaoDto);
            reply.code(201).send(disciplinaAluno);

        }catch(error){
            reply.code(500).send({error: 'Houve algum problema ao salvar'})
        }

    })

    fastify.get('/buscarDisciplinaAlunoPorAluno/:codigoAluno', async (request: any, reply) => {

        try{
            console.log(request.params.codigoAluno)
        
            const codigoAluno = request.params.codigoAluno;
            const disciplinaAluno =  buscarDisciplinaAlunoPorAlunoUseCase.execute(codigoAluno);

            if(disciplinaAluno){
                reply.code(200).send(disciplinaAluno)
            }else{
                reply.code(404).send({erro: 'Vinculo Aluno Disciplina não encontrado'})
            }
        }catch(error){
            reply.code(500).send({erro: 'Erro de servidor'})
        }


    })

    fastify.get('/buscarDisciplinaAlunoPorDisciplina/:codigoDisciplina', async (request: any, reply) => {

        try{
            const codigoDisciplina = request.params.codigoDisciplina;
            const disciplinaAluno =  buscarDisciplinaAlunoPorDisciplinaUseCase.execute(codigoDisciplina);

            if(disciplinaAluno){
                reply.code(200).send(disciplinaAluno)
            }else{
                reply.code(404).send({erro: 'Vinculo Aluno Disciplina não encontrado'})
            }
        }catch(error){
            reply.code(500).send({erro: 'Erro de servidor'})
        }


    })

    fastify.put('/alterarDisciplinaAluno/:codigo', async (request: any, reply) => {
        
        try{
            const codigo = request.params.codigo as string;
            const disciplinaAlunoAlterar = request.body as DisciplinaAlunoCriacaoDto;

            const disciplinaAlunoAlterada = 
                await alterarDisciplinaAlunoUseCase.execute(codigo, disciplinaAlunoAlterar)
            
            reply.code(200).send(disciplinaAlunoAlterada)

        }catch(error){
            reply.code(500).send({erro: 'Problema ao alterar'})
        }


    })

    fastify.delete('/deletarDisciplinaAluno/:codigo', async (request: any, reply) => {
        
        try {
            const codigo = request.params.codigo as string;
            await deletarDisciplinaAlunoUseCase.execute(codigo)

            reply.code(204).send("Deletado com sucesso ")

        } catch (error) {
            reply.code(500).send({erro: 'Problema ao deletar'})
        }

    })

    fastify.get('/listarDisciplinaAluno/:codigoAluno', async (request: any, reply) => {

        const codigoAluno = request.params.codigoAluno;
        const disciplinaAluno =  buscarDisciplinaAlunoPorAlunoUseCase.execute(codigoAluno);

        try {
            reply.code(200).send(await disciplinaAluno)
        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao listar' })
        }
    })

    done();
}
