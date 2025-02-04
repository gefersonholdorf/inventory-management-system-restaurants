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
                }
            })
        } catch (error) {
            throw new Error(`Erro ao criar Ingredinte - ${error}`)
        }
    }

    public async find(): Promise<IngredientEntity[]> {
        try {
            const ingredients = await this.prismaClient.ingredient.findMany()

            return ingredients.map((ingredient) => {
                return IngredientEntity.with({
                    ...ingredient,
                    unit: ingredient.unit as UnitTypes,
                })
            })

        } catch (error) {
            throw new Error('Erro ao listar Ingredientes!')
        }
    }
    
    public async findById(id: string): Promise<IngredientEntity>{
        try {
            const ingredient =  await this.prismaClient.ingredient.findFirst({
                where: {
                    id
                }
            })

            return IngredientEntity.with({
                ...ingredient!,
                unit: ingredient!.unit as UnitTypes,
            })

        } catch (error) {
            throw new Error('Erro ao listar o Ingrediente!')
        }
    }

    public async update(id: string, partialIngredient: Partial<IngredientEntity>): Promise<void> {
        try {
            await this.prismaClient.ingredient.update({
                where: {
                    id
                }, data: {
                    ...partialIngredient
                }
            }) 
        } catch (error) {
            throw new Error('Erro ao atualizar Ingrediente!')
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            await this.prismaClient.ingredient.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new Error('Erro ao deletar Ingrediente!')
        }
    }

}