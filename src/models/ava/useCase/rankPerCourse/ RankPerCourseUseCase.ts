import { User } from "@prisma/client"
import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository"

interface IResponse {
    name: string,
    balance: number,
    course: string
}

@injectable()
class RankPerCourseUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(nameCourse: string): Promise<IResponse[]> {
        const rank = this.usersRepository.rank(nameCourse)

        return rank
    }
}

export { RankPerCourseUseCase }