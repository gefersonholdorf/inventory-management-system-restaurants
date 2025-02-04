import { Request, Response } from "express";
import { HttpMethod, Route } from "../../api/express/route";
import { CreateIngredientInputDto, CreateIngredientOutputDto, CreateIngredientService } from "../../../usecases/services/ingredients/create-ingredient.service";
import { CreateIngredientSchema } from "../../../schemas/ingredient.schema";
import { UnitTypes } from "../../../domains/ingredients/entities/ingredient.entity";
import z from "zod"

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
            
            try {

                const requestBody = CreateIngredientSchema.parse(request.body)

                const createIngredient : CreateIngredientInputDto = {
                    name: requestBody.name,
                    unit: requestBody.unit as UnitTypes,
                    isEssential: requestBody.isEssential
                }

                const responseBody : CreateIngredientOutputDto = await this.ingredientService.execute(createIngredient)

                response.status(201).json({
                    status: 'Ingrediente adicionado com sucesso!',
                    responseBody
                })

            } catch (error) {
                if (error instanceof z.ZodError) {
                    response.status(400).json(error.issues[0].message)
                    return
                }

                response.status(500).json('Erro ao criar Ingrediente!')
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