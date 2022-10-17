import { prisma } from "../../../../database/prismaClient"

import { UsersToken } from "@prisma/client"
import { CreateUserTokenDTO } from "models/accounts/dtos/ICreateUserTokenDTO"
import { IUsersTokensRepository } from "../IUsersTokensRepository"

class UsersTokensRepository implements IUsersTokensRepository {

    async create({ user_id, refresh_token, expires_date }: CreateUserTokenDTO): Promise<UsersToken> {

        const userToken = await prisma.usersToken.create({
            data: {
                user_id,
                refresh_token,
                expires_date
            }
        })

        return userToken
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken> {
        const userToken = prisma.usersToken.findFirst({
            where: {
                user_id,
                refresh_token
            }
        })

        return userToken
    }

    async deleteById(id: string): Promise<void> {
        await prisma.usersToken.delete({
            where: {
                id
            }
        })
    }

}

export { UsersTokensRepository }