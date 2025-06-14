import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';


@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === HttpStatus.BAD_REQUEST) {
      const exceptionResponse = exception.getResponse() as any;

      if (exceptionResponse.message && Array.isArray(exceptionResponse.message)) {
        return response.status(HttpStatus.FORBIDDEN).json({
          statusCode: HttpStatus.FORBIDDEN,
          message: exceptionResponse.message,
          error: 'Forbidden'
        });
      }
    }

    return response.status(status).json(exception.getResponse());
  }
} 