import { Album } from '../model/Album.model';

export interface IAlbumService {
  findAll(): Promise<Album[]>;
  findOne(id: string): Promise<Album>;
  create(data: { name: string; year: number; artistId: string | null }): Promise<Album>;
  update(id: string, updateProps: Partial<Album>): Promise<void>;
  delete(id: string): Promise<boolean>;
}

export const ALBUM_SERVICE = 'ALBUM_SERVICE';
