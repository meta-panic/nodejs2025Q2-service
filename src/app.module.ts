import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

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
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './core/guards/authGuard';

@Module({
  imports: [CoreModule, AuthModule, PrismaModule, UsersModule, ArtistModule, AlbumModule, TrackModule, FavoriteModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => next())
      .forRoutes('auth/signup', 'auth/login', '/doc', '/');
  }
}
