import { Favorites } from "../model/Favorites.model";


export type IFavoritesRepo = {
  addTrackToFavorites(id: string): Promise<void>;
  removeTrackFromFavorites(id: string): Promise<boolean>;

  addAlbumToFavorites(id: string): Promise<void>;
  removeAlbumFromFavorites(id: string): Promise<boolean>;

  addArtistToFavorites(id: string): Promise<void>;
  removeArtistFromFavorites(id: string): Promise<boolean>;

  getFavorites(): Promise<Favorites>;
}

export const FAVORITES_REPO = 'FAVORITES_REPO';
