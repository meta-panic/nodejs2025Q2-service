import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ILoggerService, LOGGER_SERVICE } from '../services/logger.service.interface';
import { Inject } from '@nestjs/common';
import { sanitizeData } from '../utils/sanitize';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(
    @Inject(LOGGER_SERVICE)
    private readonly loggerService: ILoggerService,
  ) { }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;

    const sanitizedQuery = sanitizeData(query);
    const sanitizedBody = sanitizeData(body);

    this.loggerService.log(`Incoming Request: ${method} ${originalUrl} - Query: ${JSON.stringify(sanitizedQuery)} - Body: ${JSON.stringify(sanitizedBody)}`);

    res.on('finish', () => {
      const { statusCode } = res;
      this.loggerService.log(`Outgoing Response: ${method} ${originalUrl} - Status: ${statusCode}`,
      );
    });

    next();
  }
}
