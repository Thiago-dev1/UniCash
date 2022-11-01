import { Statement } from "@prisma/client"
import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "../../repositories/IUsersRepository"


interface ListReport {
    id: string,
    title: string,
    description: string,
    discipline: string,
    value: number,
    type: string
}

@injectable()
class AccountStatementUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(id: string): Promise<Statement[]> {
        const statements = await this.usersRepository.listStatements(id)

        return statements
    }
}

export { AccountStatementUseCase }