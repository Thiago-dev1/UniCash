import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetBalanceUseCase } from "./GetBalanceUseCase"

class GetBalanceController {

    async handle(request: Request, response: Response): Promise<Response> {

        const {id} = request.user

        const getBalanceUseCase = container.resolve(GetBalanceUseCase)

        const balance = await getBalanceUseCase.execute(id)

        return response.status(200).json({saldo: balance})
    }

}

export { GetBalanceController }