import { DisheEntity } from "../entities/dishes.entity";

export interface DishesGateway {
    create(dishe : DisheEntity) : Promise<void>
    find() : Promise<DisheEntity[]>
}