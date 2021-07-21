import { CompanyAppService } from "./app-service/CompanyAppService";
import { UserAppService } from "./app-service/UserAppService";
import { UserRequest } from "./UserRequest";

export const ApplicationProvider = [
    UserRequest,
    UserAppService,
    CompanyAppService
]