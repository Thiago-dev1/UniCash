import { container } from "tsyringe"
import { Request, Response } from "express";

import { RankPerCourseUseCase } from "./ RankPerCourseUseCase"

class RankPerCourseController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { nameCourse } = request.body


        const rankPerCourseUseCase = container.resolve(RankPerCourseUseCase)

        const rank = await rankPerCourseUseCase.execute(nameCourse)

        return response.status(200).json(rank)
    }
}

export { RankPerCourseController }