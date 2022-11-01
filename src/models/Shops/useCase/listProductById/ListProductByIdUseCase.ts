import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../error/AppError"

import { IShopsRepository } from "../../repositories/IShopsRepository"

@injectable()
class ListProductByIdUseCase {
    constructor(
        @inject("ShopsRepository")
        private shopsRepository: IShopsRepository
    ) {}

        async execute(id: string, idProduct: string) {

            const product = await this.shopsRepository.listProductById(id, idProduct)

            if(product.length == 0 ) {
                throw new AppError("Product not exists")
            }

            return product
        }

}

export { ListProductByIdUseCase }