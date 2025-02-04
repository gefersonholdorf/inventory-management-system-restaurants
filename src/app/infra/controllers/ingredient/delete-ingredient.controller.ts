import { Request, Response } from "express";
import { DeleteIngredientInputDto, DeleteIngredientService } from "../../../usecases/services/ingredients/delete-ingredients.service";
import { HttpMethod, Route } from "../../api/express/route";

export class DeleteIngredientController implements Route {

    private constructor(
        private readonly ingredientService : DeleteIngredientService,
        private readonly path : string,
        private readonly method : HttpMethod
    ){}

    getHandler(): (request: Request, response: Response) => Promise<void> {
        
        return async(request : Request, response : Response) => {
            const id : string = request.params.id as string

            try {
                const input : DeleteIngredientInputDto = {
                    id
                }

                await this.ingredientService.execute(input)

                response.status(200).json('Ingrediente deletado com suceso!')
            } catch (error) {
                console.log(error)
                response.status(500).json('Erro ao deletar Ingrediente!')
            }
        }
    }
    getPath(): string {
        return this.path
    }
    getMethod(): HttpMethod {
        return this.method
    }

    public static build(ingredientService : DeleteIngredientService) {
        return new DeleteIngredientController(
            ingredientService, '/delete-ingredient/:id', 'delete'
        )
    }
}