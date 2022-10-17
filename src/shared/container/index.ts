import { container } from "tsyringe"

import "../providers/index"

import { IUsersRepository } from "../../models/accounts/repositories/IUsersRepository"
import { UsersRepository } from "../../models/accounts/repositories/implementations/UsersRepository"
import { IShopsRepository } from "../../models/Shops/repositories/IShopsRepository"
import { ShopsRepository } from "../../models/Shops/repositories/implementations/ShopsRepository"
import { IUsersTokensRepository } from "../../models/accounts/repositories/IUsersTokensRepository"
import { UsersTokensRepository } from "../../models/accounts/repositories/implementations/UsersTokensRepository"


container.registerSingleton<IUsersRepository> (
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IUsersTokensRepository> (
    "UsersTokensRepository",
    UsersTokensRepository
)


container.registerSingleton<IShopsRepository> (
    "ShopsRepository",
    ShopsRepository
)