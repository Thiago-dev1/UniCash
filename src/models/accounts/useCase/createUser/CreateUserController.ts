import { container } from "tsyringe"
import { Request, Response } from "express"

import { CreateUserUseCase } from "./CreateUserUseCase"

class CreateUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, password, registration } = request.body

        const createUserUseCase = container.resolve(CreateUserUseCase)

        await createUserUseCase.execute({
            name,
            password,
            registration
        })

        return response.status(201).send()
    }
}

export { CreateUserController }