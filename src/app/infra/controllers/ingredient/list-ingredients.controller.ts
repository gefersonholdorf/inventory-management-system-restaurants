import { Request, Response } from "express";
import { HttpMethod, Route } from "../../api/express/route";
import { ListIngredientsOutputDto, ListIngredientsService } from "../../../usecases/services/ingredients/list-ingredients.service";

export class ListIngredientsController implements Route {

    private constructor(
        private readonly path : string,
        private readonly method : HttpMethod,
        private readonly ingredientService : ListIngredientsService
    ) {}

    public static build(ingredientService : ListIngredientsService) {
        return new ListIngredientsController(
            '/find-ingredients', 'get', ingredientService
        )
    }

    getHandler(): (request: Request, response: Response) => Promise<void> {
        
        return async (request: Request, response: Response) => {
            try {
                const ingredients : ListIngredientsOutputDto = await this.ingredientService.execute()

                response.status(200).json(ingredients)
            } catch (error) {
                console.log(error)
                response.status(500).json('Erro ao listar Ingredientes!')
            }
        }
    }
    getPath(): string {
        return this.path
    }
    getMethod(): HttpMethod {
        return this.method
    }

}