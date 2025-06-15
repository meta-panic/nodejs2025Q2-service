import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ILoggerService, LOGGER_SERVICE } from './core/services/logger.service.interface';
import { AppModule } from './app.module';

import 'dotenv/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerService = app.get<ILoggerService>(LOGGER_SERVICE);

  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API description here')
    .setVersion('1.0')
    .addTag('your-tag')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  process.on('uncaughtException', (error) => {
    loggerService.error(`Uncaught Exception: ${error.message}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggerService.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });

  await app.listen(Number(process.env.PORT) || 4000);
}
bootstrap();
