import { Router } from "express"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"


import { CreateUserController } from "../models/accounts/useCase/createUser/CreateUserController"
import { TransferUserController } from "../models/accounts/useCase/transferUser/TranserUserController"
import { GetBalanceController } from "../models/accounts/useCase/getBalance/GetBalanceController"
import { UpdateBalanceController } from "../models/accounts/useCase/updateBalance/UpdateBalanceController"

const usersRoutes = Router()

const createUserController = new CreateUserController()
const transferUserController = new TransferUserController()
const getBalanceController = new GetBalanceController()
const updateBalanceController = new UpdateBalanceController()

usersRoutes.post("/", createUserController.handle)
usersRoutes.post("/transfer", ensureAuthenticated, transferUserController.handle)
usersRoutes.get("/balance", ensureAuthenticated, getBalanceController.handle)
usersRoutes.put("/balance", ensureAuthenticated, updateBalanceController.handle)


export { usersRoutes }