import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject } from '@nestjs/common';

import { LOGGER_SERVICE, ILoggerService } from '../services/logger.service.interface';
import { sanitizeData } from '../utils/sanitize';


@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(LOGGER_SERVICE)
    private readonly loggerService: ILoggerService,
  ) { }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

    const formattedMessage = typeof message === 'object' ? JSON.stringify(message) : message;

    const sanitizedQuery = sanitizeData(request.query);
    const sanitizedBody = sanitizeData(request.body);

    this.loggerService.error(`Error: ${formattedMessage} - Url: ${request.url} - Body: ${JSON.stringify(sanitizedBody)} - Query: ${JSON.stringify(sanitizedQuery)}`);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}