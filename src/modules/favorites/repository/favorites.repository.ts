import { Injectable } from '@nestjs/common';

import { InMemoryRepo } from 'src/core/repository/fakeRepo';
import {
  IFavAlbumRepo,
  IFavArtistRepo,
  IFavTrackRepo,
} from './favorites.repository.interface';

@Injectable()
/* eslint-disable prettier/prettier */
export class InMemoryFavAlbumRepository
  extends InMemoryRepo<{ id: string }>
  implements IFavAlbumRepo { }
/* eslint-enable prettier/prettier */

@Injectable()
/* eslint-disable prettier/prettier */
export class InMemoryFavArtistRepository
  extends InMemoryRepo<{ id: string }>
  implements IFavArtistRepo { }
/* eslint-enable prettier/prettier */

@Injectable()
/* eslint-disable prettier/prettier */
export class InMemoryFavTrackRepository
  extends InMemoryRepo<{ id: string }>
  implements IFavTrackRepo { }
/* eslint-enable prettier/prettier */
