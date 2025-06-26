import { Injectable } from '@nestjs/common';

import { Album } from '../model/Album.model';
import { PersistentRepo } from 'src/core/repository/persistentRepo';
import { IAlbumRepo } from './album.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PersistentAlbumRepository
  extends PersistentRepo<Album>
  implements IAlbumRepo {
  constructor(prisma: PrismaService) {
    super(prisma, "album");
  }
}
