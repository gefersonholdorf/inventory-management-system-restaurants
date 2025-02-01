import { IngredientEntity, UnitTypes } from "../../../domains/ingredients/entities/ingredient.entity"
import { IngredientGateway } from "../../../domains/ingredients/gateways/ingredient.gateway"
import { UseCase } from "../../usecase"

export interface ListIngredientsOutputDto {
    ingredients: {
        id : string
        name : string
        unit : UnitTypes
        quantity : number
        minQuantity : number
        isEssential : boolean  
    }[]
}

export class ListIngredientsService implements UseCase<void, ListIngredientsOutputDto> {

    private constructor(private readonly ingredientGateway : IngredientGateway) {}

    public static build(ingredientGateway : IngredientGateway) {
        return new ListIngredientsService(ingredientGateway)
    }

    public async execute(): Promise<ListIngredientsOutputDto> {
        const ingredients = await this.ingredientGateway.find()
        
        return this.presentOutput(ingredients)
    }

    private presentOutput(input : IngredientEntity[]) : ListIngredientsOutputDto {
        return {
            ingredients: input.map((ingredient) => {
                return {
                    id: ingredient.id,
                    name : ingredient.name,
                    unit : ingredient.unit,
                    quantity : ingredient.quantity,
                    minQuantity : ingredient.minQuantity,
                    isEssential : ingredient.isEssential
                }
            })
        }
    }

}