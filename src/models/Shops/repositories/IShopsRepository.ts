import { Store, Product } from "@prisma/client"

interface IShopsRepository {
    listProducts(id:string): Promise<Store[]>
    listProductById(id:string, idProduct: string): Promise<Product[]>
}

export { IShopsRepository }