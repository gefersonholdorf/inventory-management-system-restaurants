import { PrismaClient } from "@prisma/client";
import { IngredientEntity, UnitTypes } from "../../domains/ingredients/entities/ingredient.entity";
import { IngredientGateway } from "../../domains/ingredients/gateways/ingredient.gateway";

export class IngredientRepository implements IngredientGateway {

    private constructor(private readonly prismaClient : PrismaClient) {}

    public static build(prismaClient : PrismaClient) {
        return new IngredientRepository(prismaClient)
    }

    public async create(ingredient: IngredientEntity): Promise<void> {

        const newIngredient = {
            id : ingredient.id,
            name : ingredient.name,
            unit : ingredient.unit.toString(),
            quantity : ingredient.quantity,
            minQuantity : ingredient.minQuantity,
            isEssential : ingredient.isEssential
        }
        try {
            await this.prismaClient.ingredient.create({
                data: {
                    ...newIngredient,
                    min_quantity: newIngredient.minQuantity,
                    is_essential: newIngredient.isEssential
                }
            })
        } catch (error) {
            throw new Error(`Erro ao criar Ingredinte - ${error}`)
        }
    }

    public async find(): Promise<IngredientEntity[]> {
        try {
            const ingredients = await this.prismaClient.ingredient.findMany()

            if (!ingredients) {
                throw new Error('Nenhum ingrediente encontrado!')
            }

            return ingredients.map((ingredient) => {
                return IngredientEntity.with({
                    ...ingredient,
                    unit: ingredient.unit as UnitTypes,
                    minQuantity: ingredient.min_quantity,
                    isEssential: ingredient.is_essential
                })
            })

        } catch (error) {
            throw new Error('Erro ao listar Ingredientes!')
        }
    }
    
    findById(id: string): Promise<IngredientEntity> {
        throw new Error("Method not implemented.");
    }
    update(id: string, partialIngredient: Partial<IngredientEntity>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}