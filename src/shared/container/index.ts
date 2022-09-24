import { container } from "tsyringe"

import { IUsersRepository } from "../../models/accounts/repositories/IUsersRepository"
import { UsersRepository } from "../../models/accounts/repositories/implementations/UsersRepository"

container.registerSingleton<IUsersRepository> (
    "UsersRepository",
    UsersRepository
)