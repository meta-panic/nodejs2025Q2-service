import { Expose } from 'class-transformer';
import { CreateAlbumDto } from './create-album';
import { Album } from '../model/Album.model';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnAlbumDto extends CreateAlbumDto {
  @ApiProperty({ description: 'The ID of the album' })
  @Expose()
  id: string;

  constructor(partial: Partial<Album>) {
    super();
    Object.assign(this, partial);
  }
}
