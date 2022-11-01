import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "../../repositories/IUsersRepository"
import { IShopsRepository } from "../../../Shops/repositories/IShopsRepository"
import { IcreateRequestUserDTO } from "../../dtos/ICreateRequestUserDTO"
import { prisma, Request } from "@prisma/client"

import { AppError } from "../../../../error/AppError"

interface ListReport {
    id: string,
    title: string,
    value: number,
    type: string
}

@injectable()
class RequestUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("ShopsRepository")
        private shopsRepository: IShopsRepository
    ) {}

    async execute({ProdutId, UserId, StoreId, amountProduct}: IcreateRequestUserDTO): Promise<Request> {

        const user = await this.usersRepository.findById(UserId)

        if(user.balance <= 0) {
            throw new AppError("Insufficient balance")
        }


        const product = await this.shopsRepository.listProductById(StoreId, ProdutId)

        const amount = product[0].value * amountProduct
        

        if(product.length == 0) {
            throw new AppError("Product not exists")
        }

        if(user.balance < amount == true) {
            throw new AppError("Insufficient balances")
        }

        
        await this.usersRepository.updateBalance({amount: -amount, id: UserId})
        

        const requestUser = await this.usersRepository.requestUser({ProdutId, UserId, amountProduct})

        return requestUser
    }
}

export { RequestUserUseCase }