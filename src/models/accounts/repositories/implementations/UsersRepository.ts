import { prisma } from "../../../../database/prismaClient"

import { ICreateUserDTO } from "models/accounts/dtos/ICreateUserDTO"
import { IUsersRepository } from "../IUsersRepository"
import { User } from "@prisma/client"

class UsersRepository implements IUsersRepository {
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