import z from 'zod'

export const CreateIngredientSchema = z.object({
    name : z.string({message: 'O campo name deve ser uma String!'}).min(3, {message: 'O nome do ingrediente deve conter no minímo 3 caracteres!'}).max(40, {message: 'O nome do ingrediente de conter no máximo 40 caracteres!'}),
    unit : z.string({message: 'O campo unit deve conter uma unidade de medida válida!'}),
    isEssential : z.boolean({message: 'Campo isEssential deve ser true ou false!'})
})