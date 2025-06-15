import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { FavoriteModule } from './modules/favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './core/core.module';
import { JwtAuthGuard } from './core/guards/authGuard';
import { HttpExceptionFilter } from './core/filters/exceptions.filter';
import { LoggerService } from './core/services/logger.service';
import { LOGGER_SERVICE } from './core/services/logger.service.interface';
import { LoggingMiddleware } from './core/middlewares/logger.middleware';

import 'dotenv/config';
import { getOutputDestination } from './core/utils/env.utils';


@Module({
  imports: [CoreModule, AuthModule, PrismaModule, UsersModule, ArtistModule, AlbumModule, TrackModule, FavoriteModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: LOGGER_SERVICE,
      useFactory: () => new LoggerService(getOutputDestination()),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => next())
      .forRoutes('auth/signup', 'auth/login', '/doc', '/')
      .apply(LoggingMiddleware)
      .forRoutes('*');
  }
}
