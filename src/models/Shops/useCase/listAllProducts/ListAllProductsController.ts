import { container } from "tsyringe"
import { Request, Response } from "express"

import { ListAllProductsUseCase } from "./ListAllProductsUseCase"

import { AppError } from "../../../../error/AppError"

class ListAllProductsController {


    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
   
        const listProductsUsecase = container.resolve(ListAllProductsUseCase)


        const products = await listProductsUsecase.execute(id)

        if(products.length == 0){
            throw new AppError("Store not exists")
        }


       return response.status(200).json(products)
    }
}

export { ListAllProductsController }