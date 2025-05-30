import { Expose } from 'class-transformer';

import { CreateTrackDto } from './create-track';
import { Track } from '../model/Track.model';

export class ReturnTrackDto extends CreateTrackDto {
  @Expose()
  id: string;

  constructor(partial: Partial<Track>) {
    super();
    Object.assign(this, partial);
  }
}
