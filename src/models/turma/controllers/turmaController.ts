import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { CadastrarTurmaUseCase } from "../domain/useCases/CadastrarTurmaUseCase";
import { TurmaCriacaoDto } from "../data/entity/Turma";
import { TurmaRepository } from "../data/repository/turmaRepository";
import { UUID } from "crypto";
import { BuscaTurmaUseCase } from "../domain/useCases/BuscarTurmaUseCase";
import { UpdateTurmaUseCase } from "../domain/useCases/UpdateTurmaUseCase";
import { DeleteTurmaUseCase } from "../domain/useCases/DeletarTurmaUseCase";


export const turmaControllers = (fastify: FastifyInstance, options: RouteShorthandOptions, done: () => void) => {

    const turmaRepository = new TurmaRepository();
    const cadastrarTurmaUseCase = new CadastrarTurmaUseCase(turmaRepository);
    const buscarTurmaUseCase = new BuscaTurmaUseCase(turmaRepository);
    const updateTurmaUseCase = new UpdateTurmaUseCase(turmaRepository);
    const deletarTurmaUseCase = new DeleteTurmaUseCase(turmaRepository);

    fastify.post('/salvarTurma', async (request, reply) => {

        try {
            
            const turma = await cadastrarTurmaUseCase.execute(request.body as TurmaCriacaoDto);
            reply.code(201).send(turma);

        } catch (error) {
            reply.code(500).send({error: "Houve algum problema ao salvar"})
        }
    })
    fastify.get('/buscarTurma/:codigo', async (request, reply) => {

        try {
            
            const codigo = request.params.codigo as UUID;
            const turma = await buscarTurmaUseCase.execute(codigo);

            if(turma){
                reply.code(200).send(turma)
            }else{
                reply.code(404).send({error: "Turma não encontrada"})
            }
           
        } catch (error) {
            
        }
    })

    fastify.put('/alterarTurma/:codigo', async (request, reply) => {

        try {
            
            const codigo = request.params.codigo as UUID;
            const turmaAlterar = request.body as TurmaCriacaoDto;

            const turma = await updateTurmaUseCase.execute(codigo, turmaAlterar);
            
            reply.code(200).send(turma)
            
        } catch (error) {
            reply.code(500).send({error: "Erro ao alterar turma"})
        }
    })

    fastify.delete('/apagarTurma/:codigo', async (request, reply) => {

        try {
            
            const codigo = request.params.codigo as UUID;
            await deletarTurmaUseCase.execute(codigo);

            reply.code(204).send("Deletedado com sucesso")
            
           
        } catch (error) {
            reply.code(404).send({error: "Erro ao apagar Ies"})
        }
    })

    done();
}