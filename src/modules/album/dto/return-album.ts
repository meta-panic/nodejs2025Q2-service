import { Expose } from 'class-transformer';
import { CreateAlbumDto } from './create-album';
import { Album } from '../model/Album.model';

export class ReturnAlbumDto extends CreateAlbumDto {
  @Expose()
  id: string;

  constructor(partial: Partial<Album>) {
    super();
    Object.assign(this, partial);
  }
}
