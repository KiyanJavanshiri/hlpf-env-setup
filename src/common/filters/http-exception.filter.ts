import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exception');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const traceId = randomUUID();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: any = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse();
      if (typeof body === 'string') {
        message = body;
      } else if (typeof body === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const obj = body as any;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        message = obj.message || obj.error || message;
        // ValidationPipe повертає масив помилок
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (Array.isArray(obj.message)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          details = obj.message;
          message = 'Validation failed';
        }
      }
    }

    // Логуємо з traceId для дебагу
    this.logger.error(
      `[${traceId}] ${request.method} ${request.url}` +
        ` — ${status} — ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(status).json({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error: {
        code: status,
        message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ...(details && { details }),
        traceId,
      },
      timestamp: new Date().toISOString(),
    });
  }
}
