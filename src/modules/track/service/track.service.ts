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


@Injectable()
export class TrackService implements ITrackService {
  constructor(
    @Inject(TRACK_REPO)
    private readonly trackRepo: ITrackRepo,
  ) { }

  async findAll() {
    const responce = (await this.trackRepo.findAll()).map((track) => {
      return plainToInstance(ReturnTrackDto, track, {
        excludeExtraneousValues: true,
      });
    });

    return responce;
  }

  async findOne(id: string) {
    const track = await this.trackRepo.findById(id);

    if (!track) throw new NotFoundException('Track Not Found');

    return plainToInstance(ReturnTrackDto, track, {
      excludeExtraneousValues: true,
    });
  }

  async create(data: {
    name: string;
    duration: number;
    artistId: string | null;
    albumId: string | null;
  }) {
    return await this.trackRepo.create({
      ...data,
      id: generateUUID(),
    });
  }

  async update(id: string, updateProps: Partial<Track>) {
    await this.trackRepo.update(id, updateProps);
  }

  async delete(id: string) {
    const isSuccess = await this.trackRepo.delete(id);


    return isSuccess;
  }
}
