import { IRepo } from 'src/core/repository/repository.interface';
import { Album } from '../model/Album.model';

export type IAlbumRepo = IRepo<Album>;
// & {
//   findByLogin: (name: User['login']) => Album | undefined;
// };

export const ALBUM_REPO = 'ALBUM_REPO';
