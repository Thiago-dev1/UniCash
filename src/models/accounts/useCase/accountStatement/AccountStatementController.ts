import { container } from "tsyringe"
import { Request, Response } from "express"

import { AccountStatementUseCase } from "./AccountStatementUseCase"


class AccountStatementController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user

        const accountStatementUseCase =  container.resolve(AccountStatementUseCase)

        const statements = await accountStatementUseCase.execute(id)

        return response.status(200).json(statements)
    }
}

export { AccountStatementController }