import { Router } from "express"
import { RequestUserController } from "../models/accounts/useCase/requestUser/RequestUserController"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ListAllProductsController } from "../models/Shops/useCase/listAllProducts/ListAllProductsController"
import { ListProductById } from "../models/Shops/useCase/listProductById/ListProductByIdController"



const shopsRoutes = Router()

const listAllProductsController = new ListAllProductsController()
const listProductById = new ListProductById()
const requestUserController = new RequestUserController()


shopsRoutes.use(ensureAuthenticated)

shopsRoutes.get("/:id", listAllProductsController.handle)
shopsRoutes.get("/:id/:idProduct", listProductById.handle)
shopsRoutes.post("/:id/:idProduct", requestUserController.handle)

export { shopsRoutes }