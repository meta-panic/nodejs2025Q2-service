import { Expose } from 'class-transformer';

import { Artist } from '../model/Artist.model';


export class ReturnArtistDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}

