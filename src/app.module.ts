import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { FavoriteModule } from './modules/favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule, ArtistModule, AlbumModule, TrackModule, FavoriteModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { } // prettier-ignore
