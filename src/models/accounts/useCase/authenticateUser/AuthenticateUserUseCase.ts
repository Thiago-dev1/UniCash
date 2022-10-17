import { inject, injectable } from "tsyringe"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"


import { IUsersRepository } from "../../repositories/IUsersRepository"
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"
import { IDateProvider } from "../../../../shared/providers/DateProvaider/IDateProvider"

import { AppError } from "../../../../error/AppError"

interface IRequest {
    cpf: string,
    password: string
}

interface IReponse {
    user: {
        registration: string,
        name: string
    },
    token: string,
    refresh_token: string
}


@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}


    async execute({ cpf, password }: IRequest): Promise<IReponse> {

        const user = await this.userRepository.findByCpf(cpf)

        

        if(!user) {
            throw new AppError("Registration or password incorrect!")
        }

        const passwordMatch = await compare(password,  user.password)


        if(!passwordMatch) {
            throw new  AppError("Registration or password incorrect!", 401)
        }

        const token = sign({}, process.env.TOKEN_SECRET_KEY, {
            subject: user.id,
            expiresIn: process.env.TOKEN_EXPIRES_IN
        })

        const refresh_token = sign({}, process.env.REFRESH_TOKEN_SECRET_KEY, {
            subject: user.id,
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        })

        const refresh_token_expires_date = this.dateProvider.addDays(30)

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date
            })

        const tokenReturn: IReponse = {
            token,
            refresh_token,
            user: {
                name: user.name,
                registration: user.registration
            }
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase }