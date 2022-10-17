import { AppError } from "../../../../error/AppError"
import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "../../repositories/IUsersRepository"


interface IResponse {
    name: string,
}

@injectable()
class GetUserByTokenUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(id: string): Promise<IResponse> {
        const user = await this.usersRepository.findById(id)

        if(!user) {
            throw new AppError("User does not exists!")
        }

        return user
    }
}

export { GetUserByTokenUseCase }