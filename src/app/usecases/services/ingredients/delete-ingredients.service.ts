import { IngredientEntity } from "../../../domains/ingredients/entities/ingredient.entity";
import { IngredientGateway } from "../../../domains/ingredients/gateways/ingredient.gateway";
import { UseCase } from "../../usecase";

export interface DeleteIngredientInputDto {
    id : string
}

export interface DeteleIngredientOutputDto extends DeleteIngredientInputDto {}

export class DeleteIngredientService implements UseCase<DeleteIngredientInputDto, DeteleIngredientOutputDto> {
    
    private constructor(private readonly ingredientGateway : IngredientGateway) {}
    
    public async execute(input: DeleteIngredientInputDto): Promise<DeteleIngredientOutputDto> {
        const ingredient = await this.ingredientGateway.findById(input.id)

        if (!ingredient) {
            throw new Error('Ingrediente não encontrado!')
        }

        await this.ingredientGateway.delete(ingredient.id)

        return this.presentOutput(ingredient)
    }

    private presentOutput(input : IngredientEntity) : DeteleIngredientOutputDto {
        return {
            id: input.id
        }
    }
}