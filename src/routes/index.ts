import { Router } from "express"

import { usersRoutes } from "./users.routes"
import { authenticateRoutes } from "./authenticate.routes"
import { shopsRoutes } from "./shops.routes"
import { avaRoutes } from "./ava.routes"

const router = Router() 

router.use("/users", usersRoutes)
router.use(authenticateRoutes)
router.use("/shops", shopsRoutes)
router.use(avaRoutes)

export { router }