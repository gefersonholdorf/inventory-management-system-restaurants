import { DisheEntity } from "../../../domains/dishes/entities/dishes.entity"
import { DishesGateway } from "../../../domains/dishes/gateways/dishes.gateway"
import { DisheRepository } from "../../../infra/repositories/dishe.repository"
import { UseCase } from "../../usecase"

export interface CreateDisheInputDto {
    name : string
    price : number
}

export interface CreateDisheOutputDto {
    id : string
}

export class CreateDisheService implements UseCase<CreateDisheInputDto, CreateDisheOutputDto> {

    private constructor(private readonly disheRepository : DisheRepository){}

    public async execute(input: CreateDisheInputDto): Promise<CreateDisheOutputDto> {
        const dishe : DisheEntity = DisheEntity.build(input.name, input.price)

        await this.disheRepository.create(dishe)

        return this.presentOutput(dishe)
    }

    private presentOutput(input : DisheEntity) : CreateDisheOutputDto {
        return {
            id: input.id
        }
    }

    public static build(disheRepository : DisheRepository) {
        return new CreateDisheService(disheRepository)
    }
}