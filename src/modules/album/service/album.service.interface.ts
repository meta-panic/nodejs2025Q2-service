import { Album } from '../model/Album.model';

export interface IAlbumService {
  findAll(): Album[];
  findOne(id: string): Album;
  create(data: { name: string; year: number; artistId: string | null }): Album;
  update(id: string, updateProps: Partial<Album>): void;
  delete(id: string): boolean;
}

export const ALBUM_SERVICE = 'ALBUM_SERVICE';
