import { forwardRef, Module } from '@nestjs/common';

import {
  InMemoryFavAlbumRepository,
  InMemoryFavArtistRepository,
  InMemoryFavTrackRepository,
} from './repository/favorites.repository';
import { FavoriteController } from './favorites.controller';
import {
  FAV_ALBUM_REPO,
  FAV_ARTIST_REPO,
  FAV_TRACK_REPO,
} from './repository/favorites.repository.interface';
import { FAVORITE_SERVICE } from './service/favorite.service.interface';
import { TrackModule } from '../track/track.module';
import { FavoriteService } from './service/favorite.service';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [FavoriteController],
  providers: [
    {
      provide: FAVORITE_SERVICE,
      useClass: FavoriteService,
    },
    {
      provide: FAV_ALBUM_REPO,
      useClass: InMemoryFavAlbumRepository,
    },
    {
      provide: FAV_ARTIST_REPO,
      useClass: InMemoryFavArtistRepository,
    },
    {
      provide: FAV_TRACK_REPO,
      useClass: InMemoryFavTrackRepository,
    },
  ],
  exports: [FAVORITE_SERVICE],
  imports: [forwardRef(() => TrackModule), forwardRef(() => AlbumModule), forwardRef(() => ArtistModule)],
})
export class FavoriteModule { } // prettier-ignore
