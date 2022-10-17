import { container } from "tsyringe"

import { IDateProvider } from "./DateProvaider/IDateProvider"
import { DayjsDateProvider } from "./DateProvaider/implementations/DayjsDateProvider"

container.registerSingleton<IDateProvider> (
    "DayjsDateProvider",
    DayjsDateProvider
)