import { prisma } from "../../../../database/prismaClient"

import { ICreateUserDTO } from "models/accounts/dtos/ICreateUserDTO"
import { IUsersRepository } from "../IUsersRepository"
import { Request, User } from "@prisma/client"
import { IcreateRequestUserDTO } from "models/accounts/dtos/ICreateRequestUserDTO"
import { IUpdateBalance } from "models/accounts/dtos/IUpdateBalance"

class UsersRepository implements IUsersRepository {

    async updateBalance({ amount, id }: IUpdateBalance): Promise<void> {
        const user = await this.findById(id)

        const upBalance = user.balance - amount


        await prisma.user.update({
            where: {
                id
            },
            data:{
                balance: upBalance
            }
        })

    }

    async requestUser({ ProdutId, UserId, amountProduct }: IcreateRequestUserDTO): Promise<Request> {
        const request = await prisma.request.create({
            data: {
                ProdutId,
                UserId,
                amountProduct
            }
        })

        return request
    }

    async findById(id: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }

    async findByRegistration(registration: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                registration
            }
        })

        return user
    }

    async create({ name, password, registration }: ICreateUserDTO): Promise<void> {
        await prisma.user.create({
            data: {
                name,
                password,
                registration
            }
        })
    }
}

export { UsersRepository }