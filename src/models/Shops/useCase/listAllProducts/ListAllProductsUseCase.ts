import { inject, injectable } from "tsyringe"

import { IShopsRepository } from "../../repositories/IShopsRepository"

@injectable()
class ListAllProductsUseCase {
    constructor(
        @inject("ShopsRepository")
        private shopsRepository: IShopsRepository
    ) {}


    async execute(id: string) {

        const products = await this.shopsRepository.listProducts(id)

        return products
    }

}

export { ListAllProductsUseCase }