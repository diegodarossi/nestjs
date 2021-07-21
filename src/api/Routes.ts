import { Type } from "@nestjs/common";
import { CompanyController } from "./controller/CompanyController";
import { UserController } from "./controller/UserController";

export const Routes:Type<any>[] = [
    UserController,
    CompanyController
]