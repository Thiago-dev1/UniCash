import { Router } from "express";
import multer from "multer";

import { ExtractionAvaController } from "../models/ava/useCase/extractionAva/ExtractionAvaController"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"


const upload = multer({
    dest: "./tmp"
})

const extractionAvaController = new ExtractionAvaController()

const avaRoutes = Router()

avaRoutes.post("/ava", upload.single("file"), extractionAvaController.handle)

export { avaRoutes }