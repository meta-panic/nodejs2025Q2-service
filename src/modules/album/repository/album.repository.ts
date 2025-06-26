import { Injectable } from '@nestjs/common';

import { Album } from '../model/Album.model';
import { InMemoryRepo } from 'src/core/repository/fakeRepo';
import { IAlbumRepo } from './album.repository.interface';

@Injectable()
/* eslint-disable prettier/prettier */
export class InMemoryAlbumRepository
  extends InMemoryRepo<Album>
  implements IAlbumRepo { }
/* eslint-enable prettier/prettier */
