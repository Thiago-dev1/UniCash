import { User, Request, Report, Statement } from "@prisma/client"
import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { IcreateRequestUserDTO } from "../dtos/ICreateRequestUserDTO"
import { IUpdateBalance } from "../dtos/IUpdateBalance"
import { ICreateReportUserDTO } from "../dtos/ICreateReportUser"

interface IResponse {
    name: string,
    balance: number,
    course: string
}

interface ListReport {
    id: string,
    title: string,
    description: string,
    discipline: string,
    value: number,
    type: string
}

interface ICreateStatement {
    title: string,
    amount: number,
    id: string,
    type: string
}

interface IUsersRepository {
    create({name, password, registration}: ICreateUserDTO): Promise<void>
    updateBalance({amount, id}: IUpdateBalance): Promise<void>
    findByCpf(cpf: string) : Promise<User>
    findById(id: string): Promise<User>
    requestUser({ProdutId, UserId}: IcreateRequestUserDTO): Promise<Request>
    createReport({idActivity ,userId, type, title, value, description, discipline}: ICreateReportUserDTO): Promise<void>
    findByReportId(id: string): Promise<Report>
    listAllReport(): Promise<ListReport[]>
    rank(nameCourse: string): Promise<IResponse[]>
    createStatement({title, amount, id}: ICreateStatement): Promise<void>
    listStatements(id: string): Promise<Statement[]>
}


export { IUsersRepository, ICreateStatement }