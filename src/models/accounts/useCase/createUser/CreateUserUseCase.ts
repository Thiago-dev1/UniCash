import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"

import { AppError } from "../../../../error/AppError"

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute({name, password,registration}: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.userRepository.findByRegistration(registration)
        console.log(userAlreadyExists)

        if(userAlreadyExists) {
            throw new AppError("User already exists")
        }

        await this.userRepository.create({name, password, registration})
        
    }
}

export { CreateUserUseCase }