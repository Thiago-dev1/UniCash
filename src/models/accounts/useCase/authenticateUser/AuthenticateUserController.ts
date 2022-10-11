import { container } from "tsyringe"
import { Request, Response } from "express"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"



class AuthenticateUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { cpf, password} = request.body

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

        const token = await authenticateUserUseCase.execute({cpf, password})

        return response.json(token)
    }
}

export { AuthenticateUserController }