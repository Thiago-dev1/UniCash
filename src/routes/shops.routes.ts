import { Router } from "express"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ListAllProductsController } from "../models/Shops/useCase/listAllProducts/ListAllProductsController"
import { ListProductById } from "../models/Shops/useCase/listProductById/ListProductByIdController"



const shopsRoutes = Router()

const listAllProductsController = new ListAllProductsController()
const listProductById = new ListProductById()

shopsRoutes.use(ensureAuthenticated)

shopsRoutes.get("/:id", listAllProductsController.handle)
shopsRoutes.get("/:id/:idProduct", listProductById.handle)

export { shopsRoutes }