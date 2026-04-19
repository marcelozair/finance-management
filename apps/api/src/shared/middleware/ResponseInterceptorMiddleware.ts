import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from 'express';

interface IResponse<T> {
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(({ data, message }: IResponse<T>) => ({
        statusCode: context.switchToHttp().getResponse<Response>().statusCode,
        message: message,
        data,
      })),
    );
  }
}
