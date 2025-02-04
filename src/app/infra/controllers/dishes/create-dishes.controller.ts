import { Request, Response } from "express";
import { CreateDisheInputDto, CreateDisheService } from "../../../usecases/services/dishes/create-dishe.service";
import { HttpMethod, Route } from "../../api/express/route";

export class CreateDisheController implements Route {

    private constructor(
        private readonly path : string,
        private readonly method : HttpMethod,
        private readonly disheService : CreateDisheService
    ){}

    getHandler(): (request: Request, response: Response) => Promise<void> {
        
        return async(request : Request, response : Response) => {
            const disheBody : CreateDisheInputDto = request.body as CreateDisheInputDto

            try {
                const responseBody = await this.disheService.execute(disheBody)

                response.status(201).json({
                    status: 'Prato adicionado com sucesso!',
                    responseBody
                })

            } catch (error) {
                console.log(error)
                response.status(500).json('Erro ao adicionar Prato!')
            }
        }
    }
    getPath(): string {
        return this.path
    }
    getMethod(): HttpMethod {
        return this.method
    }

    public static build(disheService : CreateDisheService) {
        return new CreateDisheController(
            '/create-dishe',
            'post',
            disheService
        )
    }
}