import { DisheEntity } from "../../../domains/dishes/entities/dishes.entity"
import { DisheRepository } from "../../../infra/repositories/dishe.repository"
import { UseCase } from "../../usecase"

export interface ListDisheOutputDto {
    dishes: {
        id : string
        name : string
        price : number
    }[]
}

export class ListDisheService implements UseCase<void, ListDisheOutputDto> {

    private constructor(private readonly disheRepository : DisheRepository) {}
    
    public async execute(input: void): Promise<ListDisheOutputDto> {
        const dishes = await this.disheRepository.find()

        return this.presentOutput(dishes)
    }

    private presentOutput(dishes : DisheEntity[]) : ListDisheOutputDto {
        return { 
            dishes: dishes.map((dishe) => {
                return {
                    id: dishe.id,
                    name: dishe.name,
                    price: dishe.price
                }
            })
        }
    }

    public static build(disheRepository : DisheRepository) {
        return new ListDisheService(disheRepository)
    }
    
}