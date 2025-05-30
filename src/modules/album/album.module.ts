import { forwardRef, Module } from '@nestjs/common';

import { InMemoryAlbumRepository } from './repository/album.repository';
import { AlbumController } from './album.controller';
import { ALBUM_REPO } from './repository/album.repository.interface';
import { ALBUM_SERVICE } from './service/album.service.interface';
import { AlbumService } from './service/album.service';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [
    {
      provide: ALBUM_SERVICE,
      useClass: AlbumService,
    },
    {
      provide: ALBUM_REPO,
      useClass: InMemoryAlbumRepository,
    },
  ],
  exports: [ALBUM_SERVICE],
  imports: [forwardRef(() => TrackModule)],
})
export class AlbumModule { } // prettier-ignore
