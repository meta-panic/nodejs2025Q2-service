import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { generateUUID } from 'src/core/utils';
import { ReturnTrackDto } from '../dto/return-track';
import { ITrackService } from './track.service.interface';
import {
  TRACK_REPO,
  ITrackRepo,
} from '../repository/track.repository.interface';
import { Track } from '../model/Track.model';
import { FavoriteService } from 'src/modules/favorites/service/favorite.service';
import { FAVORITE_SERVICE } from 'src/modules/favorites/service/favorite.service.interface';

@Injectable()
export class TrackService implements ITrackService {
  constructor(
    @Inject(TRACK_REPO)
    private readonly trackRepo: ITrackRepo,
    @Inject(forwardRef(() => FAVORITE_SERVICE))
    private readonly favoriteService: FavoriteService,
  ) { } // prettier-ignore

  findAll() {
    const responce = this.trackRepo.findAll().map((track) => {
      return plainToInstance(ReturnTrackDto, track, {
        excludeExtraneousValues: true,
      });
    });

    return responce;
  }

  findOne(id: string) {
    const track = this.trackRepo.findById(id);

    if (!track) throw new NotFoundException('Track Not Found');

    return plainToInstance(ReturnTrackDto, track, {
      excludeExtraneousValues: true,
    });
  }

  create(data: {
    name: string;
    duration: number;
    artistId: string | null;
    albumId: string | null;
  }) {
    return this.trackRepo.create({
      ...data,
      id: generateUUID(),
    });
  }

  update(id: string, updateProps: Partial<Track>) {
    this.trackRepo.update(id, updateProps);
  }

  delete(id: string) {
    const isSuccess = this.trackRepo.delete(id);

    if (isSuccess) {
      try {
        this.favoriteService.deleteTrack(id);
      } catch (error) {
        console.error(error);
      }
    }

    return isSuccess;
  }
}
