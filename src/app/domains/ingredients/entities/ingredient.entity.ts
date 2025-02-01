export * as crypto from 'crypto'

export type UnitTypes = 'Kg' | 'g' | 'l' | 'mL' | 'Unidade' | 'Maço' | 'Pç' | 'Ramo'

export interface IngredientProps {
    id : string
    name : string
    unit : UnitTypes
    quantity : number
    minQuantity : number
    isEssential : boolean
}

export class IngredientEntity {

    private constructor(private props : IngredientProps) {
        this.validation()
    }

    public static build(name : string, unit : UnitTypes, isEssential : boolean) {
        return new IngredientEntity({
            id: crypto.randomUUID(),
            name,
            unit,
            quantity: 0,
            minQuantity: 0,
            isEssential: isEssential
        })
    }

    public static with(props : IngredientProps) {
        return new IngredientEntity(props)
    }

    public get id() {
        return this.props.id
    }

    public get name() {
        return this.props.name
    }

    public get unit() {
        return this.props.unit
    }

    public get quantity() {
        return this.props.quantity
    }

    public get minQuantity() {
        return this.props.minQuantity
    }

    public get isEssential() {
        return this.props.isEssential
    }

    private validation() {
        if (this.props.name.length < 3 || this.props.name.length > 40) {
            throw new Error('Nome do Igrediente deve ser maior que 3 e menor que 40 caracteres!')
        }

        const types : UnitTypes[] = ['Kg', 'g', 'l', 'mL', 'Unidade', 'Maço', 'Pç', 'Ramo']

        if (!types.includes(this.props.unit)) {
            throw new Error('Unidade inválida!')
        }
    }
}