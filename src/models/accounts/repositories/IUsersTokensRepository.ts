import { UsersToken } from "@prisma/client"

import { CreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"


interface IUsersTokensRepository {
    create({}: CreateUserTokenDTO): Promise<UsersToken>
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken>
    deleteById(id: string): Promise<void>
}

export { IUsersTokensRepository }