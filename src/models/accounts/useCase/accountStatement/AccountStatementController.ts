import { container } from "tsyringe"
import { Request, Response } from "express"

import { AccountStatementUseCase } from "./AccountStatementUseCase"


class AccountStatementController {

    async handle(request: Request, response: Response): Promise<Response> {

        const accountStatementUseCase =  container.resolve(AccountStatementUseCase)

        const reports = await accountStatementUseCase.execute()

        return response.status(200).json(reports)
    }
}

export { AccountStatementController }