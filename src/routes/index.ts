import { Router } from "express"

import { usersRoutes } from "./users.routes"
import { authenticateRoutes } from "./authenticate.routes"
import { shopsRoutes } from "./shops.routes"

const router = Router() 

router.use("/users", usersRoutes)
router.use(authenticateRoutes)
router.use("/shops", shopsRoutes)

export { router }