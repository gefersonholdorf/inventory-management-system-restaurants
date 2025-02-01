import { IngredientEntity } from "../entities/ingredient.entity"

export interface IngredientGateway {
    create(ingredient : IngredientEntity) : Promise<void>
    list() : Promise<IngredientEntity[]>
    update(id : string, partialIngredient : Partial<IngredientEntity>) : Promise<void>
    delete(id : string) : Promise<void>
}