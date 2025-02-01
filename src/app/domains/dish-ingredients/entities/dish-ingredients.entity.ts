export * as crypto from 'crypto'

export interface DishIngredientsProps {
    id : string,
    dishId : string,
    ingredientId : string,
    quantityNeeded : number 
}

export class DishIngredientsEntity {

    private constructor(private props : DishIngredientsProps) {
        this.validation()
    }

    public static build(dishId : string, ingredientId : string, quantityNeeded : number) {
        return new DishIngredientsEntity({
            id: crypto.randomUUID(),
            dishId,
            ingredientId,
            quantityNeeded
        })
    }

    public static with(prosps : DishIngredientsProps) {
        return new DishIngredientsEntity(prosps)
    }

    public get id() {
        return this.props.id
    }

    public get dishId() {
        return this.props.dishId
    }

    public get ingredientId() {
        return this.props.ingredientId
    }

    public get quantityNeeded() {
        return this.props.quantityNeeded
    }

    public validation() {
        if (this.props.quantityNeeded <= 0) {
            throw new Error('A quantidade necessária não pode ser negativa!')
        }
    }
}