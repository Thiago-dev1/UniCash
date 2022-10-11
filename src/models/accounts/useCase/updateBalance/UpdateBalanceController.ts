import { Request, Response } from "express"
import { container } from "tsyringe"

import { UpdateBalanceUseCase } from "./UpdateBalanceUseCase"

class UpdateBalanceController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        const {recipientId, recipientBalance, senderId, senderBalance} = request.body


        const updateBalanceUseCase = container.resolve(UpdateBalanceUseCase)

        await updateBalanceUseCase.execute(recipientBalance, recipientId)
        await updateBalanceUseCase.execute(senderBalance, senderId)

        return response.status(200).send()
    }
}

export { UpdateBalanceController }