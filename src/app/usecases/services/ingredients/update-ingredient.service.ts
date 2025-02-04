import { IngredientEntity, UnitTypes } from "../../../domains/ingredients/entities/ingredient.entity"
import { IngredientGateway } from "../../../domains/ingredients/gateways/ingredient.gateway"
import { UseCase } from "../../usecase"

export interface UpdateIngredientInputDto {
        id : string
        name ?: string
        unit ?: UnitTypes
        quantity ?: number
        minQuantity ?: number
        isEssential ?: boolean
}

export interface UpdateIngredientOutputDto {
    id : string
}

export class UpdateIngredientService implements UseCase<UpdateIngredientInputDto, UpdateIngredientOutputDto> {

    private constructor(private readonly ingredientGateway : IngredientGateway) {}

    public static build(ingredientGateway : IngredientGateway) {
        return new UpdateIngredientService(ingredientGateway)
    }

    public async execute(input: UpdateIngredientInputDto): Promise<UpdateIngredientOutputDto> {

        const ingredient = await this.ingredientGateway.findById(input.id) 

        if (!ingredient) {
            throw new Error('Ingrediente não encontrado!')
        }

        const ingredientPartial : Partial<IngredientEntity> = {
            name : input.name,
            unit : input.unit,
            quantity : input.quantity,
            minQuantity : input.minQuantity,
            isEssential : input.isEssential
        }

        await this.ingredientGateway.update(input.id, ingredientPartial)

        return this.presentOutput(ingredient)
    }

    private presentOutput(input : IngredientEntity) : UpdateIngredientOutputDto {
        return {
            id: input.id!
        }
    }

}