import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Response as TResponse } from 'express';

export interface Response<T> {
  data: T;
  statusCode: number;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const statusCode = context
      .switchToHttp()
      .getResponse<TResponse>().statusCode;

    return next.handle().pipe(
      map((data) => ({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data,
        statusCode,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
