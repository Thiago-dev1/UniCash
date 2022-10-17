import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe"

import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"
import { IDateProvider } from "../../../../shared/providers/DateProvaider/IDateProvider"

import { AppError } from "../../../../error/AppError"

interface IPayload {
    sub: string,
}

interface IResponse {
    token: string,
    refresh_token: string
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}


    async execute(RefreshToken: string): Promise<IResponse> {
        const { sub } = verify(RefreshToken, process.env.REFRESH_TOKEN_SECRET_KEY) as IPayload;
        
        const user_id = sub

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, RefreshToken)

        if (!userToken) {
            throw new AppError("Refresh token does not exists!")
        }

        await this.usersTokensRepository.deleteById(userToken.id)

        const newToken = sign({},  process.env.TOKEN_SECRET_KEY, {
            subject: sub,
            expiresIn: process.env.TOKEN_EXPIRES_IN,
        })
    
        const refresh_token = sign({}, process.env.REFRESH_TOKEN_SECRET_KEY, {
            subject: sub,
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        })

        const refresh_token_expires_date = this.dateProvider.addDays(30)

        await this.usersTokensRepository.create({
            user_id,
            refresh_token,
            expires_date: refresh_token_expires_date
        })

        const tokenReturn: IResponse = {
            token: newToken,
            refresh_token,
        }

        return tokenReturn
    }
}

export { RefreshTokenUseCase }