import { container } from "tsyringe"
import { Request, Response } from "express"

import { ListProductByIdUseCase } from "./ListProductByIdUseCase"


class ListProductById {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id, idProduct } = request.params

        const listProductByIdUseCase = container.resolve(ListProductByIdUseCase)

        const product = await listProductByIdUseCase.execute(id, idProduct)

        return response.status(200).json(product)
    }
}

export { ListProductById } 