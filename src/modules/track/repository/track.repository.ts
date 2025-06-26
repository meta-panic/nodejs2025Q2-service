import { Injectable } from '@nestjs/common';

import { Track } from '../model/Track.model';
import { InMemoryRepo } from 'src/core/repository/fakeRepo';
import { ITrackRepo } from './track.repository.interface';

@Injectable()
/* eslint-disable prettier/prettier */
export class InMemoryTrackRepository
  extends InMemoryRepo<Track>
  implements ITrackRepo {}
/* eslint-enable prettier/prettier */
