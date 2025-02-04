import { PrismaClient } from "@prisma/client";
import { DisheEntity } from "../../domains/dishes/entities/dishes.entity";
import { DishesGateway } from "../../domains/dishes/gateways/dishes.gateway";

export class DisheRepository implements DishesGateway {

    private constructor(private readonly prismaClient : PrismaClient) {}

    public static build(prismaClient : PrismaClient) {
        return new DisheRepository(prismaClient)
    }

    public async create(dishe : DisheEntity): Promise<void> {

        const disheData = {
            id: dishe.id,
            name: dishe.name,
            price: dishe.price
        }

        try {
            await this.prismaClient.dishe.create({
                data: {
                    ...disheData
                }
            })

        } catch (error) {
            throw new Error('Erro ao criar Prato!')
        }
    }

    public async find(): Promise<DisheEntity[]> {
        try {
            const dishes = await this.prismaClient.dishe.findMany()

            return dishes.map((dishe) => {
                return DisheEntity.with({
                    id: dishe.id,
                    name: dishe.name,
                    price: Number(dishe.price)
                })
            })

        } catch (error) {
            throw new Error('Erro ao listar Pratos!')
        }
    }

}