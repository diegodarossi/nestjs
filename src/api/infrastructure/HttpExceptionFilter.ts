import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from 'src/base/model/ApiResponse';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('BidException');

  public catch(exception: HttpException | Error, host: ArgumentsHost) {
    let retorno: ApiResponse;

    if (exception instanceof HttpException) {
      let httpException = exception as HttpException;

      if (httpException.getResponse() instanceof ApiResponse) { 
        retorno = httpException.getResponse() as ApiResponse;
      } else {
        retorno = new ApiResponse(httpException.getStatus(), httpException.message);
      }
    } else {
      let error = exception as Error;
      retorno = new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, process.env['MODE'] != 'DEV' ? 'Internal server error' : error.stack);

      this.logger.error(error.message, error.stack);
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(retorno.statusCode).json(retorno);
  }
}