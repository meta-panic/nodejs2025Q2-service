import { forwardRef, Module } from '@nestjs/common';

import { InMemoryArtistRepository } from './repository/artist.repository';
import { ArtistService } from './service/artist.service';
import { ARTIST_SERVICE } from './service/artist.service.interface';
import { ArtistController } from './artist.controller';
import { ARTIST_REPO } from './repository/artist.repository.interface';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [
    {
      provide: ARTIST_SERVICE,
      useClass: ArtistService,
    },
    {
      provide: ARTIST_REPO,
      useClass: InMemoryArtistRepository,
    },
  ],
  imports: [forwardRef(() => AlbumModule), forwardRef(() => TrackModule)],
})
export class ArtistModule { }
