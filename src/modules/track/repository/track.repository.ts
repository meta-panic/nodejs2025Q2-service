import { Injectable } from '@nestjs/common';

import { Track } from '../model/Track.model';
import { ITrackRepo } from './track.repository.interface';
import { PersistentRepo } from 'src/core/repository/persistentRepo';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PersistentTrackRepository
  extends PersistentRepo<Track>
  implements ITrackRepo {
  constructor(prisma: PrismaService) {
    super(prisma, "track");
  }
}
