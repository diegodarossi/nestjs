import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class UserRequest {
    userId: string;

    companyId: string;
}