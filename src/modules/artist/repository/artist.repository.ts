import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { Artist } from '../model/Artist.model';
import { IArtistRepo } from './artist.repository.interface';
import { PersistentRepo } from 'src/core/repository/persistentRepo';

@Injectable()
export class PersistentArtistRepository
  extends PersistentRepo<Artist>
  implements IArtistRepo {
  constructor(prisma: PrismaService) {
    super(prisma, "artist");
  }
}
