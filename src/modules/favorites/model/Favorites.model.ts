import { Album } from 'src/modules/album/model/Album.model';
import { Artist } from 'src/modules/artist/model/Artist.model';
import { Track } from 'src/modules/track/model/Track.model';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
