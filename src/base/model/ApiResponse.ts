import { HttpStatus } from "@nestjs/common";

export class ApiResponse<T = any> {
    constructor(public readonly statusCode: HttpStatus,
                public readonly message: string,
                public readonly data?: T) {}
}