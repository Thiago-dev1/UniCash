import { prisma } from "../../../../database/prismaClient"

import { Store } from "@prisma/client";
import { IShopsRepository } from "../IShopsRepository"


class ShopsRepository implements IShopsRepository {
    
    async listProductById(id: string, idProduct: string): Promise<Store[]> {
        const product = await prisma.store.findMany({
            where: {
                id
            },
            include: {
                Product: {
                    where: {
                        id: idProduct,
                    }
                }
            }
        })

        return product
    }
    
    async listProducts(id: string): Promise<Store[]> {
        const products = await prisma.store.findMany({
            where: {
                id
            },
            include: {
                Product: true
            }
        })

        return products
    }

}

export { ShopsRepository }