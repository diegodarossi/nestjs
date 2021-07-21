import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/base/model/ApiResponse';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
          map(data => {
            if (data instanceof ApiResponse) {
              context.switchToHttp().getResponse().status(data.statusCode);
            }

            return data;
          }),
      );
  }
}