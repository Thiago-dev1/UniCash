import { container } from "tsyringe"
import { Request, Response } from "express"

import { TransferUserUseCase } from "./TransferUserUseCase"

class TransferUserController {

    async handle(request:Request , response: Response):Promise<Response> {
        const {id} = request.user
        const {cpf, amount} = request.body

        const transferUserUseCase = container.resolve(TransferUserUseCase)


        await transferUserUseCase.execute({id, amount, cpf})

        return response.status(201).send()
    }
}

export { TransferUserController }