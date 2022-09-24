import { User } from "@prisma/client"
import { ICreateUserDTO } from "../dtos/ICreateUserDTO"

interface IUsersRepository {
    create({name, password, registration}: ICreateUserDTO): Promise<void>
    findByRegistration(registration: string) : Promise<User>
    findById(id: string): Promise<User>
}


export { IUsersRepository }