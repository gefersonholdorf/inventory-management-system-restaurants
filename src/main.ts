import { ApiExpress } from "./app/infra/api/express/api.express"
import { CreateDisheController } from "./app/infra/controllers/dishes/create-dishes.controller"
import { ListDishesController } from "./app/infra/controllers/dishes/list-dishes.controller"
import { CreateIngredientController } from "./app/infra/controllers/ingredient/create-ingredient.controller"
import { DeleteIngredientController } from "./app/infra/controllers/ingredient/delete-ingredient.controller"
import { ListIngredientsController } from "./app/infra/controllers/ingredient/list-ingredients.controller"
import { UpdateIngredientController } from "./app/infra/controllers/ingredient/update-ingredient.controller"
import { DisheRepository } from "./app/infra/repositories/dishe.repository"
import { IngredientRepository } from "./app/infra/repositories/ingredient.repositoty"
import { prismaClient } from "./app/package/prisma"
import { CreateDisheService } from "./app/usecases/services/dishes/create-dishe.service"
import { ListDisheService } from "./app/usecases/services/dishes/list-dishe.service"
import { CreateIngredientService } from "./app/usecases/services/ingredients/create-ingredient.service"
import { DeleteIngredientService } from "./app/usecases/services/ingredients/delete-ingredients.service"
import { ListIngredientsService } from "./app/usecases/services/ingredients/list-ingredients.service"
import { UpdateIngredientService } from "./app/usecases/services/ingredients/update-ingredient.service"

function main() {

    // Repositories
    const ingredientRepository = IngredientRepository.build(prismaClient)
    const disheRepository = DisheRepository.build(prismaClient)

    // Services
    const createIngredientService = CreateIngredientService.build(ingredientRepository)
    const listIngredientsService = ListIngredientsService.build(ingredientRepository)
    const updateIngredientService = UpdateIngredientService.build(ingredientRepository)
    const deleteIngredientService = DeleteIngredientService.build(ingredientRepository)
    const createDisheService = CreateDisheService.build(disheRepository)
    const listDisheService = ListDisheService.build(disheRepository)

    // Controllers
    const createIngredientController = CreateIngredientController.build(createIngredientService)
    const listIngredientsController = ListIngredientsController.build(listIngredientsService)
    const updateIngredientController = UpdateIngredientController.build(updateIngredientService)
    const deleteIngredientController = DeleteIngredientController.build(deleteIngredientService)
    const createDisheController = CreateDisheController.build(createDisheService)
    const listDisheController = ListDishesController.build(listDisheService)

    const api = ApiExpress.build([createIngredientController, listIngredientsController, updateIngredientController, deleteIngredientController,
        createDisheController, listDisheController
    ])

    const port = 3399

    api.start(port)
}

main()