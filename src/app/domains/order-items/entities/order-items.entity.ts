export * as crypto from 'crypto'

export interface OrderItemsProps {
    id : string
    orderId : string
    dishId : string
    quantity : number
}

export class OrderItemsEntity {

    private constructor(private props : OrderItemsProps) {}

    public static build(orderId : string, dishId : string, quantity : number) {
        return new OrderItemsEntity({
            id: crypto.randomUUID(),
            orderId,
            dishId,
            quantity
        })
    }

    public static with(prosps : OrderItemsProps) {
            return new OrderItemsEntity(prosps)
        }
    
        public get id() {
            return this.props.id
        }
    
        public get dishId() {
            return this.props.dishId
        }
    
        public get orderId() {
            return this.props.orderId
        }
    
        public get quantity() {
            return this.props.quantity
        }
    
        public validation() {
            if (this.props.quantity <= 0) {
                throw new Error('A quantidade necessária não pode ser negativa!')
            }
        }
}