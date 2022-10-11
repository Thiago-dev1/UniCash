import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ITransferDTO } from "../../dtos/ITransferUserDTO"

import { AppError } from "../../../../error/AppError"


@injectable()
class TransferUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({id, amount, cpf}: ITransferDTO): Promise<void> {
        // id = id do user logado no sistama
        // user

        if(amount <= 0 ) {
            throw new AppError("Invalid amount")
        }

        const user = await this.usersRepository.findById(id)


        if(user.balance <= 0) {
            throw new AppError("Insufficient funds")
        }

        const userAlreadyExists = await this.usersRepository.findByCpf(cpf)


        if(userAlreadyExists == null) {
            throw new AppError("Invalid account")
        }

        

        await this.usersRepository.updateBalance({id, amount: -amount})
        

        await this.usersRepository.updateBalance({id: userAlreadyExists.id, amount})
    }
}


export { TransferUserUseCase }