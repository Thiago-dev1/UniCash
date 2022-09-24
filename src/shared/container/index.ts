import { container } from "tsyringe"

import { IUsersRepository } from "../../models/accounts/repositories/IUsersRepository"
import { UsersRepository } from "../../models/accounts/repositories/implementations/UsersRepository"
import { IShopsRepository } from "../../models/Shops/repositories/IShopsRepository"
import { ShopsRepository } from "../../models/Shops/repositories/implementations/ShopsRepository"


container.registerSingleton<IUsersRepository> (
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IShopsRepository> (
    "ShopsRepository",
    ShopsRepository
)