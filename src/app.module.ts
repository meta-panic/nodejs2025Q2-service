import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';

@Module({
  imports: [UsersModule, ArtistModule, AlbumModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { } // prettier-ignore
