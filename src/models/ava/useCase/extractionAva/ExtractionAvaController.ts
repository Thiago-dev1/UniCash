import { Request, Response } from "express"
import { container } from "tsyringe"
import { ExtractionAvaUseCase } from "./ExtractionAvaUseCase"


class ExtractionAvaController {


    async handle(req: Request, res: Response): Promise<Response> {
        const { file } = req

        const importCategoriesUseCase = container.resolve(ExtractionAvaUseCase)

        await importCategoriesUseCase.execute(file)
    
        return res.status(201).send()
    }
}

export { ExtractionAvaController }