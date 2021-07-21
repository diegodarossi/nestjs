import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiResponse } from "../model/ApiResponse";

export class SchemaException extends HttpException {
    constructor(message: string, data?: object) {
        let response = new ApiResponse(HttpStatus.BAD_REQUEST, message, data);
        super(response, HttpStatus.BAD_REQUEST);
    }
}