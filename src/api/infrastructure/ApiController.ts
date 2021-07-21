import { HttpStatus } from "@nestjs/common";
import { ApiResponse } from "src/base/model/ApiResponse";

export class ApiController {
    public static Ok = <T>(message: string, data?: T): ApiResponse<T> => {
        return new ApiResponse(HttpStatus.OK, message, data);
    };

    public static Accepted = <T>(message: string, data?: T): ApiResponse<T> => {
        return new ApiResponse(HttpStatus.ACCEPTED, message, data);
    };

    public static Error = (message: string, data?: Object) => {
        return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, message, data);
    };
}