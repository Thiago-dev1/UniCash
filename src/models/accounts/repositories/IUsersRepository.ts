import { User, Request } from "@prisma/client"
import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { IcreateRequestUserDTO } from "../dtos/ICreateRequestUserDTO"
import { IUpdateBalance } from "../dtos/IUpdateBalance"

interface IUsersRepository {
    create({name, password, registration}: ICreateUserDTO): Promise<void>
    updateBalance({amount, id}: IUpdateBalance): Promise<void>
    findByRegistration(registration: string) : Promise<User>
    findById(id: string): Promise<User>
    requestUser({ProdutId, UserId}: IcreateRequestUserDTO): Promise<Request>
}


export { IUsersRepository }