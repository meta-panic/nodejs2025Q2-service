import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { Artist } from '../model/Artist.model';

export class ReturnArtistDto {
  @ApiProperty({ description: 'The ID of the artist' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'The name of the artist' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'Indicates if the artist has won a Grammy' })
  @Expose()
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
