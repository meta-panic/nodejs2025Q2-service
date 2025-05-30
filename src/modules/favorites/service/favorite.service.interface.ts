import { Favorites } from '../model/Favorites.model';

export interface IFavoriteService {
  findAll(): Favorites;

  addTrack(id: string): void;
  deleteTrack(id: string): void;

  addAlbum(id: string): void;
  deleteAlbum(id: string): void;

  addArtist(id: string): void;
  deleteArtist(id: string): void;
}

export const FAVORITE_SERVICE = 'FAVORITE_SERVICE';
