import { IngredientEntity, UnitTypes } from "../../../domains/ingredients/entities/ingredient.entity";
import { IngredientGateway } from "../../../domains/ingredients/gateways/ingredient.gateway";
import { UseCase } from "../../usecase";

export interface CreateIngredientInputDto {
    name : string 
    unit : UnitTypes
    isEssential : boolean
}

export interface CreateIngredientOutputDto {
    id : string
}

export class CreateIngredientService implements UseCase<CreateIngredientInputDto, CreateIngredientOutputDto> {
    
    private constructor(private readonly ingredientGateway : IngredientGateway) {}

    public static build(ingredientGateway : IngredientGateway) {
        return new CreateIngredientService(ingredientGateway)
    }
    
    public async execute(input: CreateIngredientInputDto): Promise<CreateIngredientOutputDto> {
        const ingredient :IngredientEntity = IngredientEntity.build(input.name, input.unit, input.isEssential)

        await this.ingredientGateway.create(ingredient)

        return await this.present(ingredient)
    }

    private present(input : IngredientEntity) : CreateIngredientOutputDto {
        const output : CreateIngredientOutputDto = {
            id: input.id
        }

        return output
    }

}