import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "../../repositories/IUsersRepository"


@injectable()
class GetBalanceUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(user_id: string): Promise<number> {
        const {balance} = await this.usersRepository.findById(user_id)

        return balance
    }
}

export { GetBalanceUseCase }