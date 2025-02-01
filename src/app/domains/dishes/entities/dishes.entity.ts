import * as crypto from 'crypto'

export interface DishesProps {
    id : string
    name : string
    price : number
}

export class DisheEntity {
    private constructor(private props : DishesProps) {
        this.validation()
    }

    public static build(name : string, price : number) {
        return new DisheEntity({
            id: crypto.randomUUID(),
            name,
            price
        })
    }
    
    public static with(props : DishesProps) {
        return new DisheEntity(props)
    }

    public get id() {
        return this.props.id
    }

    public get name() {
        return this.props.name
    }

    public get price() {
        return this.props.price
    }

    private validation() {
            if (this.props.name.length < 3 || this.props.name.length > 40) {
                throw new Error('Nome do Prato deve ser maior que 3 e menor que 40 caracteres!')
            }
    
            if (this.props.price <= 0.0) {
                throw new Error('Não é possível cadastrar um prato com valor negativo!')
            }
        }
} 