import { OrderEntity, StatusOrder } from "../entities/order.entity";

export interface OrderGateway {
    create(order : OrderEntity) : Promise<void>
    list() : Promise<OrderEntity[]>
    update(id : string, status : StatusOrder) : Promise<void>
}