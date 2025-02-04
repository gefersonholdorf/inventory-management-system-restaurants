import { ApiExpress } from "./app/infra/api/express/api.express"
import { CreateIngredientController } from "./app/infra/controllers/ingredient/create-ingredient.controller"
import { DeleteIngredientController } from "./app/infra/controllers/ingredient/delete-ingredient.controller"
import { ListIngredientsController } from "./app/infra/controllers/ingredient/list-ingredients.controller"
import { UpdateIngredientController } from "./app/infra/controllers/ingredient/update-ingredient.controller"
import { IngredientRepository } from "./app/infra/repositories/ingredient.repositoty"
import { prismaClient } from "./app/package/prisma"
import { CreateIngredientService } from "./app/usecases/services/ingredients/create-ingredient.service"
import { DeleteIngredientService } from "./app/usecases/services/ingredients/delete-ingredients.service"
import { ListIngredientsService } from "./app/usecases/services/ingredients/list-ingredients.service"
import { UpdateIngredientService } from "./app/usecases/services/ingredients/update-ingredient.service"

function main() {

    // Repositories
    const ingredientRepository = IngredientRepository.build(prismaClient)

    // Services
    const createIngredientService = CreateIngredientService.build(ingredientRepository)
    const listIngredientsService = ListIngredientsService.build(ingredientRepository)
    const updateIngredientService = UpdateIngredientService.build(ingredientRepository)
    const deleteIngredientService = DeleteIngredientService.build(ingredientRepository)

    // Controllers
    const createIngredientController = CreateIngredientController.build(createIngredientService)
    const listIngredientsController = ListIngredientsController.build(listIngredientsService)
    const updateIngredientController = UpdateIngredientController.build(updateIngredientService)
    const deleteIngredientController = DeleteIngredientController.build(deleteIngredientService)

    const api = ApiExpress.build([createIngredientController, listIngredientsController, updateIngredientController, deleteIngredientController])

    const port = 3399

    api.start(port)
}

main()