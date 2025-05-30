import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { generateUUID, nullifyEntityInField } from 'src/core/utils';
import { ReturnAlbumDto } from '../dto/return-album';
import { IAlbumService } from './album.service.interface';
import {
  ALBUM_REPO,
  IAlbumRepo,
} from '../repository/album.repository.interface';
import { Album } from '../model/Album.model';
import { TrackService } from 'src/modules/track/service/track.service';
import { TRACK_SERVICE } from 'src/modules/track/service/track.service.interface';
import { FavoriteService } from 'src/modules/favorites/service/favorite.service';
import { FAVORITE_SERVICE } from 'src/modules/favorites/service/favorite.service.interface';

@Injectable()
export class AlbumService implements IAlbumService {
  constructor(
    @Inject(ALBUM_REPO)
    private readonly albumRepo: IAlbumRepo,
    @Inject(forwardRef(() => TRACK_SERVICE))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FAVORITE_SERVICE))
    private readonly favoriteService: FavoriteService,
  ) { } // prettier-ignore

  findAll() {
    const responce = this.albumRepo.findAll().map((user) => {
      return plainToInstance(ReturnAlbumDto, user, {
        excludeExtraneousValues: true,
      });
    });

    return responce;
  }

  findOne(id: string) {
    const album = this.albumRepo.findById(id);

    if (!album) throw new NotFoundException('Album Not Found');

    return plainToInstance(ReturnAlbumDto, album, {
      excludeExtraneousValues: true,
    });
  }

  create(data: { name: string; year: number; artistId: string | null }) {
    return this.albumRepo.create({
      ...data,
      id: generateUUID(),
    });
  }

  update(id: string, updateProps: Partial<Album>) {
    this.albumRepo.update(id, updateProps);
  }

  delete(id: string) {
    const isSuccess = this.albumRepo.delete(id);

    if (isSuccess) {
      try {
        nullifyEntityInField(this.trackService, id, 'albumId');
        this.favoriteService.deleteAlbum(id);
      } catch (error) {
        console.error(error);
      }
    }

    return isSuccess;
  }
}
