import { forwardRef, Module } from '@nestjs/common';

import { PersistentArtistRepository } from './repository/artist.repository';
import { ArtistService } from './service/artist.service';
import { ARTIST_SERVICE } from './service/artist.service.interface';
import { ArtistController } from './artist.controller';
import { ARTIST_REPO } from './repository/artist.repository.interface';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { FavoriteModule } from '../favorites/favorites.module';

@Module({
  controllers: [ArtistController],
  providers: [
    {
      provide: ARTIST_SERVICE,
      useClass: ArtistService,
    },
    {
      provide: ARTIST_REPO,
      useClass: PersistentArtistRepository,
    },
  ],
  exports: [ARTIST_SERVICE],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavoriteModule),
  ],
})
export class ArtistModule { }
