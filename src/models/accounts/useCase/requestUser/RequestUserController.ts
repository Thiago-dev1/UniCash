import { container } from "tsyringe"
import { Request, Response } from "express"

import { RequestUserUseCase } from "./RequestUserUseCase"


class RequestUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { amountProduct = 1 } = request.body

        const { user } = request
        const { idProduct: ProdutId } = request.params 
        const { id: StoreId } = request.params 

        const requestUserCase = container.resolve(RequestUserUseCase)

        const requestUser = await requestUserCase.execute({UserId: user.id, ProdutId, StoreId, amountProduct })

        return response.status(201).json(requestUser)
    }
}

export { RequestUserController } 