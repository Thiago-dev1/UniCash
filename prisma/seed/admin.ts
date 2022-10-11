import { prisma } from "../../src/database/prismaClient"

import { hash } from "bcrypt"


async function create() {
    const password = await hash("admin", 8)

    await prisma.user.create({
        data: {
            name: "admin",
            password,
            isAdmin: true,
            cpf: '00000000000',
            registration: '',
            course: '',
        }
    })

    await prisma.$disconnect()
}

create().then(() => console.log("User admin created!"))