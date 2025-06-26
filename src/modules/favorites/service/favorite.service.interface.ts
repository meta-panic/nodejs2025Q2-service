import { Favorites } from '../model/Favorites.model';

export interface IFavoriteService {
  findAll(): Promise<Favorites>;

  addTrack(id: string): Promise<void>;
  deleteTrack(id: string): Promise<void>;

  addAlbum(id: string): Promise<void>;
  deleteAlbum(id: string): Promise<void>;

  addArtist(id: string): Promise<void>;
  deleteArtist(id: string): Promise<void>;
}

export const FAVORITE_SERVICE = 'FAVORITE_SERVICE';
