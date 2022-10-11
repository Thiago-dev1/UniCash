import { inject, injectable } from "tsyringe"
import { parse } from "csv-parse"
import fs from "fs"
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository"


interface IExtractionAva {
    idActivity: string
    userId: string
    type: string
    title: string
    description: string
    value: number
    discipline?: string
}


@injectable()
class ExtractionAvaUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) { }

    loadAva(file: Express.Multer.File): Promise<IExtractionAva[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path)
            const ava: IExtractionAva[] = []

            const parseFile = parse()

            stream.pipe(parseFile)

            parseFile.on("data", async (line) => {
                const [idActivity, userId, type, title, description, value, discipline] = line

                ava.push({
                    idActivity,
                    userId,
                    type,
                    title,
                    description,
                    value,
                    discipline
                })
            })
                .on("end", () => {
                    fs.promises.unlink(file.path)
                    resolve(ava)
                })
                .on("error", (err) => {
                    reject(err)
                })
        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const ava = await this.loadAva(file)

        ava.map(async (ava) => {
            const { idActivity, userId, type, title, description, value, discipline } = ava
           
            const exitsReport = await this.usersRepository.findByReportId(idActivity)

            if (!exitsReport) {
                await this.usersRepository.createReport({
                     idActivity,
                     userId, 
                     type, 
                     title, 
                     description, 
                     value: Number(value), 
                     discipline
                })
                await this.usersRepository.updateBalance({id: userId, amount: Number(value)})
            }
            
        })

        
    }
}

export { ExtractionAvaUseCase }