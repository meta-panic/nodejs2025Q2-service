import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { CreateTrackDto } from './create-track';
import { Track } from '../model/Track.model';

export class ReturnTrackDto extends CreateTrackDto {
  @ApiProperty({ description: 'The ID of the track' })
  @Expose()
  id: string;

  constructor(partial: Partial<Track>) {
    super();
    Object.assign(this, partial);
  }
}
