import { inject, injectable } from "tsyringe"

import { IShopsRepository } from "../../repositories/IShopsRepository"

@injectable()
class ListProductByIdUseCase {
    constructor(
        @inject("ShopsRepository")
        private shopsRepository: IShopsRepository
    ) {}

        async execute(id: string, idProduct: string) {

            const product = await this.shopsRepository.listProductById(id, idProduct)

            return product
        }

}

export { ListProductByIdUseCase }