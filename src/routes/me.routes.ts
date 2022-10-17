import { Router } from "express"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { GetUserByTokenController } from "../models/accounts/useCase/getUserByToken/GetUserByTokenController"

const meRoutes = Router()

const getUserByTokenController = new GetUserByTokenController()

meRoutes.get('/me', ensureAuthenticated, getUserByTokenController.handle)


export { meRoutes }