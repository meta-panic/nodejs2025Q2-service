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
    private readonly albumRepo: IAlbumRepo
  ) { }

  async findAll() {
    const responce = (await this.albumRepo.findAll()).map((user) => {
      return plainToInstance(ReturnAlbumDto, user, {
        excludeExtraneousValues: true,
      });
    });

    return responce;
  }

  async findOne(id: string) {
    const album = await this.albumRepo.findById(id);

    if (!album) throw new NotFoundException('Album Not Found');

    return plainToInstance(ReturnAlbumDto, album, {
      excludeExtraneousValues: true,
    });
  }

  async create(data: { name: string; year: number; artistId: string | null }) {
    return await this.albumRepo.create({
      ...data,
      id: generateUUID(),
    });
  }

  async update(id: string, updateProps: Partial<Album>) {
    await this.albumRepo.update(id, updateProps);
  }

  async delete(id: string) {
    const isSuccess = await this.albumRepo.delete(id);

    return isSuccess;
  }
}
