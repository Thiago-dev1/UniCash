import { prisma } from "../../../../database/prismaClient"

import { Store, Product } from "@prisma/client";
import { IShopsRepository } from "../IShopsRepository"


class ShopsRepository implements IShopsRepository {
    
    async listProductById(id: string, idProduct: string): Promise<Product[]> {
        const product = await prisma.product.findMany({
            where: {
                StoreId: id,
                id: idProduct
            },

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