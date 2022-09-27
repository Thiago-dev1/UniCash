import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

import { UsersRepository } from "../models/accounts/repositories/implementations/UsersRepository"
import { AppError } from  "../error/AppError"


interface IPayload {
    sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new AppError("Token missing")
    }

    const [, token] = authHeader.split(" ")


    try {
        const { sub: user_id } = verify(token, process.env.TOKEN_SECRET_KEY) as IPayload

        const usersRepository = new UsersRepository()

        const user = usersRepository.findById(user_id)

        if(!user) {
            throw new AppError("User does not exists!")
        }

        req.user = {
            id: user_id, 
        }

        next()
    } catch {
        throw new AppError("Invalid token!")
    }
}