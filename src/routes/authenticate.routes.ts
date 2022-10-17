import { Router } from "express";


import { AuthenticateUserController } from "../models/accounts/useCase/authenticateUser/AuthenticateUserController"
import { RefreshTokenController } from "../models/accounts/useCase/refreshToken/RefreshTokenController"
import { RequestUserController } from "../models/accounts/useCase/requestUser/RequestUserController"

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()
const requestUserController = new RequestUserController()

authenticateRoutes.post("/sessions", authenticateUserController.handle)
authenticateRoutes.post("/refresh-token", refreshTokenController.handle)

export { authenticateRoutes }