import { Request, Response } from "express"
import { container } from "tsyringe"
import { GetUserByTokenUseCase } from "./GetUserByTokenUseCase"

class GetUserByTokenController {

    async handle(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id

        const getUserByTokenUseCase = container.resolve(GetUserByTokenUseCase)

        const user = await getUserByTokenUseCase.execute(user_id)

        return response.status(200).json(user)
    }
}

export { GetUserByTokenController }