import { prisma } from "../../src/database/prismaClient"

import { hash } from "bcrypt"


async function create() {
    const password = await hash("12345678", 8)

    await prisma.user.create({
        data: {
            name: "Thiago Henrique",
            password,
            cpf: "111111111",
            registration: "111111118",
            course: "Engenharia de Software",
            balance: 780
        }
    })

    await prisma.user.create({
        data: {
            name: "Paulo",
            password,
            cpf: "1111111",
            registration: "1111111",
            course: "Engenharia de Software",
            balance: 740
        }
    })

    await prisma.user.create({
        data: {
            name: "Fabio",
            password,
            cpf: "0000000",
            registration: "50000000",
            course: "Direito",
            balance: 720
        }
    })

    await prisma.user.create({
        data: {
            name: "Marta",
            password,
            cpf: "000000",
            registration: "8000007",
            course: "Direito",
            balance: 720
        }
    })

    await prisma.user.create({
        data: {
            name: "Santos",
            password,
            cpf: "0000007",
            registration: "2000100",
            course: "Engenharia mecânica",
            balance: 790
        }
    })

    await prisma.user.create({
        data: {
            name: "Carla",
            password,
            cpf: "0002200",
            registration: "3000200",
            course: "Engenharia mecânica",
            balance: 790
        }
    })

    await prisma.user.create({
        data: {
            name: "Caio",
            password,
            cpf: "0004300",
            registration: "7000400",
            course: "Engenharia civil",
            balance: 710
        }
    })

    await prisma.user.create({
        data: {
            name: "Gustavo",
            password,
            cpf: "00043001",
            registration: "10004001",
            course: "Engenharia civil",
            balance: 710
        }
    })


    await prisma.$disconnect()
}

create().then(() => console.log("User users created!"))