import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { Artist } from 'src/modules/artist/model/Artist.model';
import { Favorites } from '../model/Favorites.model';
import { Track } from 'src/modules/track/model/Track.model';
import { Album } from 'src/modules/album/model/Album.model';

export class ReturnFavoritesDto {
  @ApiProperty({ type: [Artist], description: 'List of favorite artists' })
  @Expose()
  artists: Artist[];

  @ApiProperty({ type: [Album], description: 'List of favorite albums' })
  @Expose()
  albums: Album[];

  @ApiProperty({ type: [Track], description: 'List of favorite tracks' })
  @Expose()
  tracks: Track[];

  constructor(favorites: Favorites) {
    Object.assign(this, favorites);
  }
}
