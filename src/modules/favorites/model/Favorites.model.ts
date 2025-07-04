import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/modules/album/model/Album.model';
import { Artist } from 'src/modules/artist/model/Artist.model';
import { Track } from 'src/modules/track/model/Track.model';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class FavoritesDTO {
  @ApiProperty()
  artists: Artist[];
  @ApiProperty()
  albums: Album[];
  @ApiProperty()
  tracks: Track[];
}
