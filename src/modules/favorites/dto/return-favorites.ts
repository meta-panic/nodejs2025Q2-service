import { Expose } from 'class-transformer';

import { Artist } from 'src/modules/artist/model/Artist.model';
import { Favorites } from '../model/Favorites.model';
import { Track } from 'src/modules/track/model/Track.model';
import { Album } from 'src/modules/album/model/Album.model';

export class ReturnFavoritesDto {
  @Expose()
  artists: Artist[];

  @Expose()
  albums: Album[];

  @Expose()
  tracks: Track[];

  constructor(favorites: Favorites) {
    Object.assign(this, favorites);
  }
}
