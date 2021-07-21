import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiResponse } from "../model/ApiResponse";

export class ValidatorException extends HttpException {
    constructor(message: string, data?: object) {
        let response = new ApiResponse(HttpStatus.UNPROCESSABLE_ENTITY, message, data);
        super(response, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}