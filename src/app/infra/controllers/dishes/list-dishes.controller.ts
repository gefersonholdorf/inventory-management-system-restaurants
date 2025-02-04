import { Request, Response } from "express";
import { ListDisheService } from "../../../usecases/services/dishes/list-dishe.service";
import { HttpMethod, Route } from "../../api/express/route";

export class ListDishesController implements Route {

    private constructor(
        private readonly path : string,
        private readonly method : HttpMethod,
        private readonly disheService : ListDisheService
    ){}

    getHandler(): (request: Request, response: Response) => Promise<void> {
        
        return async(request : Request, response : Response) => {
            try {
                const dishes = await this.disheService.execute()

                response.status(200).json(dishes)

            } catch (error) {
                console.log(error)
                response.status(500).json('Erro ao listar pratos!')
            }
        }
    }
    getPath(): string {
        return this.path
    }
    getMethod(): HttpMethod {
        return this.method
    }

    public static build(disheService : ListDisheService) {
        return new ListDishesController(
            '/find-dishes',
            'get',
            disheService
        )
    }
}