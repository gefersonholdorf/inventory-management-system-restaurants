import { Request, Response } from "express";
import { UpdateIngredientInputDto, UpdateIngredientService } from "../../../usecases/services/ingredients/update-ingredient.service";
import { HttpMethod, Route } from "../../api/express/route";

export class UpdateIngredientController implements Route {

    private constructor(
        private readonly path : string,
        private readonly method : HttpMethod,
        private readonly ingredientService : UpdateIngredientService
    ){}

    getHandler(): (request: Request, response: Response) => Promise<void> {

        return async (request : Request, response : Response) => {
            const id : string = request.params.id as string
            const ingredientBody : UpdateIngredientInputDto = {
                ...request.body,
                id
            }

            try {
                const responseBody = await this.ingredientService.execute(ingredientBody)

                response.status(200).json({
                    status: 'Ingrediente atualizado com sucesso!',
                    responseBody
                })
                
            } catch (error) {
                console.log(error)
                response.status(500).json('Erro ao atualizar o ingrediente!')
            }
        }
    }
    getPath(): string {
        return this.path
    }
    getMethod(): HttpMethod {
        return this.method
    }

    public static build(ingredientService : UpdateIngredientService) {
        return new UpdateIngredientController(
            '/update-ingredient/:id',
            'patch',
            ingredientService
        )
    }
}