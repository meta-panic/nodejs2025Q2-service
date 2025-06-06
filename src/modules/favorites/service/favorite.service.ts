import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ReturnFavoritesDto } from '../dto/return-favorites';
import { IFavoriteService } from './favorite.service.interface';
import {
  FAV_ALBUM_REPO,
  FAV_ARTIST_REPO,
  FAV_TRACK_REPO,
  IFavAlbumRepo,
  IFavArtistRepo,
  IFavTrackRepo,
} from '../repository/favorites.repository.interface';
import { TrackService } from 'src/modules/track/service/track.service';
import { TRACK_SERVICE } from 'src/modules/track/service/track.service.interface';
import { ARTIST_SERVICE } from 'src/modules/artist/service/artist.service.interface';
import { ArtistService } from 'src/modules/artist/service/artist.service';
import { ALBUM_SERVICE } from 'src/modules/album/service/album.service.interface';
import { AlbumService } from 'src/modules/album/service/album.service';

@Injectable()
export class FavoriteService implements IFavoriteService {
  constructor(
    @Inject(FAV_ALBUM_REPO)
    private readonly favAlbumRepo: IFavAlbumRepo,
    @Inject(FAV_ARTIST_REPO)
    private readonly favArtistRepo: IFavArtistRepo,
    @Inject(FAV_TRACK_REPO)
    private readonly favTrackRepo: IFavTrackRepo,
    @Inject(TRACK_SERVICE)
    private readonly trackService: TrackService,
    @Inject(ARTIST_SERVICE)
    private readonly artistService: ArtistService,
    @Inject(ALBUM_SERVICE)
    private readonly albumService: AlbumService,
  ) { } // prettier-ignore

  async addTrack(id: string): Promise<void> {
    try {
      const track = await this.trackService.findOne(id);

      if (track) {
        this.favTrackRepo.create({ id });
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          'Track with the id does not exist',
        );
      }
    }
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.favTrackRepo.findById(id);
    if (!track) {
      throw new NotFoundException('Track with the id is not favorite');
    }

    this.favTrackRepo.delete(id);
  }

  async addAlbum(id: string): Promise<void> {
    try {
      const album = this.albumService.findOne(id);

      if (album) {
        this.favAlbumRepo.create({ id });
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          'Album with the id does not exist',
        );
      }
    }
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.favAlbumRepo.findById(id);
    if (!album) {
      throw new UnprocessableEntityException(
        'Album with the id is not favorite',
      );
    }

    await this.favAlbumRepo.delete(id);
  }

  async addArtist(id: string): Promise<void> {
    try {
      const artist = await this.artistService.findOne(id);

      if (artist) {
        await this.favArtistRepo.create({ id });
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          'Artist with the id does not exist',
        );
      }
    }
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.favArtistRepo.findById(id);
    if (!artist) {
      throw new UnprocessableEntityException(
        'Artist with the id is not favorite',
      );
    }

    await this.favArtistRepo.delete(id);
  }

  async findAll() {
    const fav = {
      artists: await Promise.all(
        Object.entries(await this.favArtistRepo.findAll()).map(([, value]) =>
          this.artistService.findOne(value.id),
        ),
      ),
      albums: await Promise.all(
        Object.entries(await this.favAlbumRepo.findAll()).map(([, value]) =>
          this.albumService.findOne(value.id),
        ),
      ),
      tracks: await Promise.all(
        Object.entries(await this.favTrackRepo.findAll()).map(([, value]) =>
          this.trackService.findOne(value.id),
        ),
      ),
    };

    return plainToInstance(ReturnFavoritesDto, fav, {
      excludeExtraneousValues: true,
    });
  }
}
