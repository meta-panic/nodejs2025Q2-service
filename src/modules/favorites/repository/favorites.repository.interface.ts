import { IRepoAsync } from 'src/core/repository/repository.interface';

export type IFavAlbumRepo = IRepoAsync<{ id: string }>;
export const FAV_ALBUM_REPO = 'FAV_ALBUM_REPO';

export type IFavArtistRepo = IRepoAsync<{ id: string }>;
export const FAV_ARTIST_REPO = 'FAV_ARTIST_REPO';

export type IFavTrackRepo = IRepoAsync<{ id: string }>;
export const FAV_TRACK_REPO = 'FAV_TRACK_REPO';
