import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { generateUUID } from 'src/core/utils';
import { ReturnArtistDto } from '../dto/return-artist';
import { ARTIST_REPO, IArtistRepo } from '../repository/artist.repository.interface';
import { IArtistService } from './artist.service.interface';
import { Artist } from '../model/Artist.model';


@Injectable()
export class ArtistService implements IArtistService {
  constructor(
    @Inject(ARTIST_REPO)
    private readonly artistRepo: IArtistRepo
  ) { }

  findAll() {
    const responce = this.artistRepo.findAll().map((user) => {
      return plainToInstance(ReturnArtistDto, user, {
        excludeExtraneousValues: true,
      });
    })

    return responce;
  }

  findOne(id: string) {
    const artist = this.artistRepo.findById(id)

    if (!artist) throw new NotFoundException('User Not Found')

    return plainToInstance(ReturnArtistDto, artist, {
      excludeExtraneousValues: true,
    });
  }

  create(data: { name: string; grammy: boolean }) {
    return this.artistRepo.create({
      name: data.name, grammy: data.grammy, id: generateUUID(),
    });
  }

  update(id: string, updateProps: Partial<Artist>) {
    this.artistRepo.update(id, updateProps)
  }

  delete(id: string) {
    const isSuccess = this.artistRepo.delete(id);

    return isSuccess;
  }
}