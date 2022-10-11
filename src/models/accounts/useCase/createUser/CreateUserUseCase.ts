import { inject, injectable } from "tsyringe"
import { hash } from "bcrypt"

import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"

import { AppError } from "../../../../error/AppError"

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute({name, password,registration, cpf, course}: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.userRepository.findByCpf(cpf)

        if(userAlreadyExists) {
            throw new AppError("User already exists")
        }

        const passwordHash = await hash(password, 8)

        await this.userRepository.create({name, password: passwordHash, registration, cpf, course})
        
    }
}

export { CreateUserUseCase }