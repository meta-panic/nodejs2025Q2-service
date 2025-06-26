import { Injectable } from '@nestjs/common';

import { Artist } from '../model/Artist.model';
import { IArtistRepo } from './artist.repository.interface';
import { InMemoryRepo } from 'src/core/repository/fakeRepo';

@Injectable()
export class InMemoryArtistRepository
  extends InMemoryRepo<Artist>
  implements IArtistRepo {}
