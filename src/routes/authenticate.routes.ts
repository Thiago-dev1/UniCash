import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

import { AuthenticateUserController } from "../models/accounts/useCase/authenticateUser/AuthenticateUserController"
import { RequestUserController } from "../models/accounts/useCase/requestUser/RequestUserController"

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const requestUserController = new RequestUserController()

authenticateRoutes.post("/sessions", authenticateUserController.handle)

export { authenticateRoutes }