import { ApiExpress } from "./app/infra/api/express/api.express"
import { IngredientRepository } from "./app/infra/repositories/ingredient.repositoty"
import { prismaClient } from "./app/package/prisma"

function main() {

    const ingredientRepository = IngredientRepository.build(prismaClient)

    const api = ApiExpress.build([])

    const port = 3399

    api.start(port)
}

main()