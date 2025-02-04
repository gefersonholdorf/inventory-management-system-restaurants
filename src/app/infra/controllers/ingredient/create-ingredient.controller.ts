import { Request, Response } from "express";
import { HttpMethod, Route } from "../../api/express/route";
import { CreateIngredientInputDto, CreateIngredientOutputDto, CreateIngredientService } from "../../../usecases/services/ingredients/create-ingredient.service";

export class CreateIngredientController implements Route {

    private constructor(
        private readonly ingredientService : CreateIngredientService,
        private readonly path : string,
        private readonly httpMethod : HttpMethod
    ) {}

    public static build(ingredientService : CreateIngredientService) {
        return new CreateIngredientController(ingredientService, '/create-ingredient', 'post')
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {

        return async(request: Request, response : Response) => {
            const createIngredient = request.body as CreateIngredientInputDto

            try {
                const responseBody : CreateIngredientOutputDto = await this.ingredientService.execute(createIngredient)

                response.status(201).json({
                    status: 'Ingrediente adicionado com sucesso!',
                    responseBody
                })
            } catch (error) {
                console.log(error)
                response.status(500).json({
                    error: `Erro ao adicionar novo ingrediente!`
                })
            }
        }
    }

    getPath(): string {
        return this.path
    }
    getMethod(): HttpMethod {
        return this.httpMethod
    }

}