import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { generateUUID } from 'src/core/utils';
import { ReturnArtistDto } from '../dto/return-artist';
import {
  ARTIST_REPO,
  IArtistRepo,
} from '../repository/artist.repository.interface';
import { IArtistService } from './artist.service.interface';
import { Artist } from '../model/Artist.model';
import { AlbumService } from 'src/modules/album/service/album.service';
import { ALBUM_SERVICE } from 'src/modules/album/service/album.service.interface';
import { TrackService } from 'src/modules/track/service/track.service';
import { TRACK_SERVICE } from 'src/modules/track/service/track.service.interface';
import { FAVORITE_SERVICE } from 'src/modules/favorites/service/favorite.service.interface';
import { FavoriteService } from 'src/modules/favorites/service/favorite.service';

@Injectable()
export class ArtistService implements IArtistService {
  constructor(
    @Inject(ARTIST_REPO)
    private readonly artistRepo: IArtistRepo,
    @Inject(forwardRef(() => ALBUM_SERVICE))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TRACK_SERVICE))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FAVORITE_SERVICE))
    private readonly favoriteService: FavoriteService,
  ) { } // prettier-ignore

  async findAll() {
    const responce = (await this.artistRepo.findAll()).map((user) => {
      return plainToInstance(ReturnArtistDto, user, {
        excludeExtraneousValues: true,
      });
    });

    return responce;
  }

  async findOne(id: string) {
    const artist = await this.artistRepo.findById(id);

    if (!artist) throw new NotFoundException('Artist Not Found');

    return plainToInstance(ReturnArtistDto, artist, {
      excludeExtraneousValues: true,
    });
  }

  async create(data: { name: string; grammy: boolean }) {
    return await this.artistRepo.create({
      name: data.name,
      grammy: data.grammy,
      id: generateUUID(),
    });
  }

  async update(id: string, updateProps: Partial<Artist>) {
    await this.artistRepo.update(id, updateProps);
  }

  async delete(id: string) {
    const isSuccess = await this.artistRepo.delete(id);

    console.log("isSuccess - ", isSuccess)

    return isSuccess;
  }
}
