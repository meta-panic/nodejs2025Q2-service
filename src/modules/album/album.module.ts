import { Module } from '@nestjs/common';

import { InMemoryAlbumRepository } from './repository/album.repository';
import { AlbumController } from './album.controller';
import { ALBUM_REPO } from './repository/album.repository.interface';
import { ALBUM_SERVICE } from './service/album.service.interface';
import { AlbumService } from './service/album.service';

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
})
export class AlbumModule { } // prettier-ignore
