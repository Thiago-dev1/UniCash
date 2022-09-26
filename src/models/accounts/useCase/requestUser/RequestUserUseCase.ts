import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "../../repositories/IUsersRepository"
import { IShopsRepository } from "../../../Shops/repositories/IShopsRepository"
import { IcreateRequestUserDTO } from "../../dtos/ICreateRequestUserDTO"
import { Request } from "@prisma/client"

import { AppError } from "../../../../error/AppError"

@injectable()
class RequestUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("ShopsRepository")
        private shopsRepository: IShopsRepository
    ) {}

    async execute({ProdutId, UserId, balance, StoreId, amountProduct}: IcreateRequestUserDTO): Promise<Request> {

        if(balance <= 0) {
            throw new AppError("Insufficient balance")
        }


        const product = await this.shopsRepository.listProductById(StoreId, ProdutId)

        const amount = product[0].value * amountProduct

        if(product.length == 0) {
            throw new AppError("Product not exists")
        }

        if(amount < balance == false) {
            throw new AppError("Insufficient balance")
        }

        
        await this.usersRepository.updateBalance({amount, id: UserId})
        

        const requestUser = await this.usersRepository.requestUser({ProdutId, UserId, amountProduct})

        return requestUser
    }
}

export { RequestUserUseCase }