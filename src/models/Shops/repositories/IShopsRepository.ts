import { Store } from "@prisma/client"

interface IShopsRepository {
    listProducts(id:string): Promise<Store[]>
    listProductById(id:string, idProduct: string): Promise<Store[]>
}

export { IShopsRepository }