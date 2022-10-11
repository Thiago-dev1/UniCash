import { inject, injectable } from "tsyringe"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"


import { IUsersRepository } from "../../repositories/IUsersRepository"
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
    token: string
}


@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
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

        const tokenReturn: IReponse = {
            token,
            user: {
                name: user.name,
                registration: user.registration
            }
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase }