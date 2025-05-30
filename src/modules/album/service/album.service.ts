import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { generateUUID } from 'src/core/utils';
import { ReturnAlbumDto } from '../dto/return-album';
import { IAlbumService } from './album.service.interface';
import {
  ALBUM_REPO,
  IAlbumRepo,
} from '../repository/album.repository.interface';
import { Album } from '../model/Album.model';

@Injectable()
export class AlbumService implements IAlbumService {
  constructor(
    @Inject(ALBUM_REPO)
    private readonly albumRepo: IAlbumRepo,
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
    const user = this.albumRepo.findById(id);

    if (!user) throw new NotFoundException('User Not Found');

    return plainToInstance(ReturnAlbumDto, user, {
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

    return isSuccess;
  }
}
