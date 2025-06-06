import { IRepoAsync } from 'src/core/repository/repository.interface';
import { Album } from '../model/Album.model';


export type IAlbumRepo = IRepoAsync<Album>;
export const ALBUM_REPO = 'ALBUM_REPO';
