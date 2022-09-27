import { Router } from "express"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"


import { CreateUserController } from "../models/accounts/useCase/createUser/CreateUserController"
import { TransferUserController } from "../models/accounts/useCase/transferUser/TranserUserController"

const usersRoutes = Router()

const createUserController = new CreateUserController()
const transferUserController = new TransferUserController()

usersRoutes.post("/", createUserController.handle)
usersRoutes.post("/transfer", ensureAuthenticated, transferUserController.handle)


export { usersRoutes }