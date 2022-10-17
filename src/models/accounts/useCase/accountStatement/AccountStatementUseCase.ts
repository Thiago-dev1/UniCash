import { Report } from "@prisma/client"
import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "../../repositories/IUsersRepository"

@injectable()
class AccountStatementUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(): Promise<Report[]> {
        const reports = await this.usersRepository.listAllReport()

        return reports
    }
}

export { AccountStatementUseCase }