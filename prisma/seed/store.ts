import { prisma } from "../../src/database/prismaClient"

import { hash } from "bcrypt"


async function create() {
    await prisma.store.create({
        data: {
            name: "UniShop",
            Product:{
                createMany: {
                    data: [
                        {name: "Camisa", value: 120},
                        {name: "Caderno", value: 30},
                    ]
                },

            }
        }
    })

    await prisma.store.create({
        data: {
            name: "UniBurger",
            Product:{
                createMany: {
                    data: [
                        {name: "Coca", value: 40},
                        {name: "Odonto - Burger (Vegetariano)", value: 80},
                        {name: "Dell Valle", value: 40},
                        {name: "Pastel de Carne Assado", value: 70},
                    ]
                },

            }
        }
    })

    await prisma.$disconnect()
}

create().then(() => console.log("Store created!"))