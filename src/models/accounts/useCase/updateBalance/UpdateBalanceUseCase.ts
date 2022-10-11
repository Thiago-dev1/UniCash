import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "../../repositories/IUsersRepository"

@injectable()
class UpdateBalanceUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(balance: number, id: string): Promise<void> {
        await this.usersRepository.updateBalance({id, balance})
    }
}

export { UpdateBalanceUseCase }