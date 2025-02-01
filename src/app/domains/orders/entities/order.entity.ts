import * as crypto from 'crypto'

export type StatusOrder = 'PENDENTE' | 'PREPARO' | 'COMPLETO' | 'CANCELADO'

export interface OrderProps {
    id : string
    tableNumber : number
    status : StatusOrder
}

export class OrderEntity {

    private constructor(private props : OrderProps) {
        this.validation()
    }

    public static build(tableNumber : number) {
        return new OrderEntity({
            id: crypto.randomUUID(),
            tableNumber,
            status: 'PENDENTE'
        })
    }

    public static with(props : OrderProps) {
        return new OrderEntity(props)
    }

    public get id() {
        return this.props.id
    }

    public get tableNumber() {
        return this.props.tableNumber
    }

    public get status() {
        return this.props.status
    }

    private validation() {
        if (this.props.tableNumber <= 0) {
            throw new Error('Número da mesa não pode ser menor ou igual a 0!')
        }
    }
}