import { Router } from "express";
import multer from "multer";

import { ExtractionAvaController } from "../models/ava/useCase/extractionAva/ExtractionAvaController"
import { RankPerCourseController } from "../models/ava/useCase/rankPerCourse/ RankPerCourseController"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"


const upload = multer({
    dest: "./tmp"
})

const extractionAvaController = new ExtractionAvaController()
const rankPerCourseController = new RankPerCourseController()

const avaRoutes = Router()

avaRoutes.post("/ava", upload.single("file"), extractionAvaController.handle)
avaRoutes.get("/ava/rank", rankPerCourseController.handle)



export { avaRoutes }