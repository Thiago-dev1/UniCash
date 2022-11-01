import { prisma } from "../../../../database/prismaClient"

import { ICreateUserDTO } from "models/accounts/dtos/ICreateUserDTO"
import { ICreateStatement, IUsersRepository } from "../IUsersRepository"
import { Report, Request, Statement, User } from "@prisma/client"
import { IcreateRequestUserDTO } from "models/accounts/dtos/ICreateRequestUserDTO"
import { IUpdateBalance } from "models/accounts/dtos/IUpdateBalance"
import { ICreateReportUserDTO } from "models/accounts/dtos/ICreateReportUser"

interface IResponse {
    name: string,
    balance: number,
    course: string
}

interface ListReport {
    id: string,
    title: string,
    value: number,
    description: string,
    discipline: string,
    type: string
}

class UsersRepository implements IUsersRepository {
    
    async listStatements(id: string): Promise<Statement[]> {
        const statements = await prisma.statement.findMany({
            where: {
                user_id: id
            }
        })

        return statements
    }
    
    async createStatement({ title, amount, id, type }: ICreateStatement): Promise<void> {
       await prisma.statement.create({
            data: {
                title,
                amount,
                user_id: id,
                type
            }
        })
    }
    
    async rank(nameCourse: string): Promise<IResponse[]> {
        const rank = await prisma.user.findMany({
            where: {
                course: nameCourse
            },
            select: {
                name: true,
                balance: true,
                course: true
            },
            orderBy: {
                balance: "desc"
            }
        })

        return rank
    }
    
    async listAllReport(): Promise<ListReport[]> {
        const reports = await prisma.report.findMany({
            select: {
                id: true,
                title: true,
                value: true,
                description: true,
                discipline: true,
                type: true
            }
        })
        return reports
    }

    async findByReportId(id: string): Promise<Report> {
        const reports = await prisma.report.findUnique({
            where: {
                idActivity: id
            }
        })

        return reports
    }

    async createReport({idActivity, userId, type, title, value, description, discipline }: ICreateReportUserDTO): Promise<void> {
        await prisma.report.create({
            data: {
                idActivity,
                userId, 
                type, 
                title, 
                value, 
                description, 
                discipline
            }
        })
    }

    async updateBalance({ id, amount }: IUpdateBalance): Promise<void> {
        const user = await this.findById(id)


        if(amount < 0) {
            const upBalance = user.balance - amount
            await prisma.user.update({
                where: {
                    id
                },
                data:{
                    balance: upBalance
                }
            })
        }

        const upBalance = user.balance + amount

        await prisma.user.update({
            where: {
                id
            },
            data:{
                balance: upBalance
            }
        })

        
    }

    async requestUser({ ProdutId, UserId, amountProduct }: IcreateRequestUserDTO): Promise<Request> {
        const request = await prisma.request.create({
            data: {
                ProdutId,
                UserId,
                amountProduct
            }
        })

        return request
    }

    async findById(id: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        
        return user
    }

    async findByCpf(cpf: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                cpf
            }
        })

        return user
    }

    async create({ name, password, registration, cpf, course }: ICreateUserDTO): Promise<void> {
        await prisma.user.create({
            data: {
                name,
                password,
                registration,
                cpf,
                course
            }
        })
    }
}

export { UsersRepository }