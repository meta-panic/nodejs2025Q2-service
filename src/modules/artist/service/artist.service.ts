import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { generateUUID, nullifyEntityInField } from 'src/core/utils';
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

  findAll() {
    const responce = this.artistRepo.findAll().map((user) => {
      return plainToInstance(ReturnArtistDto, user, {
        excludeExtraneousValues: true,
      });
    });

    return responce;
  }

  findOne(id: string) {
    const artist = this.artistRepo.findById(id);

    if (!artist) throw new NotFoundException('User Not Found');

    return plainToInstance(ReturnArtistDto, artist, {
      excludeExtraneousValues: true,
    });
  }

  create(data: { name: string; grammy: boolean }) {
    return this.artistRepo.create({
      name: data.name,
      grammy: data.grammy,
      id: generateUUID(),
    });
  }

  update(id: string, updateProps: Partial<Artist>) {
    this.artistRepo.update(id, updateProps);
  }

  delete(id: string) {
    const isSuccess = this.artistRepo.delete(id);

    if (isSuccess) {
      try {
        nullifyEntityInField(this.albumService, id, 'artistId');
        nullifyEntityInField(this.trackService, id, 'artistId');
        this.favoriteService.deleteArtist(id);
      } catch (error) {
        console.error(error);
      }
    }

    return isSuccess;
  }
}
