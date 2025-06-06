import { Injectable } from '@nestjs/common';

import { PersistentRepo } from 'src/core/repository/persistentRepo';
import {
  IFavAlbumRepo,
  IFavArtistRepo,
  IFavTrackRepo,
} from './favorites.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PersistentFavAlbumRepository
  extends PersistentRepo<{ id: string }>
  implements IFavAlbumRepo {
  constructor(prisma: PrismaService) {
    super(prisma, "favAlbum");
  }
}

@Injectable()
export class PersistentFavArtistRepository
  extends PersistentRepo<{ id: string }>
  implements IFavArtistRepo {
  constructor(prisma: PrismaService) {
    super(prisma, "favArtist");
  }
}

@Injectable()
export class PersistentFavTrackRepository
  extends PersistentRepo<{ id: string }>
  implements IFavTrackRepo {
  constructor(prisma: PrismaService) {
    super(prisma, "favTrack");
  }
}
