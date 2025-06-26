import { Artist } from '../model/Artist.model';

export interface IArtistService {
  findAll(): Promise<Artist[]>;
  findOne(id: string): Promise<Artist>;
  create(data: { name: string; grammy: boolean }): Promise<Artist>;
  update(id: string, updateProps: Partial<Artist>): Promise<void>;
  delete(id: string): Promise<boolean>;
}

export const ARTIST_SERVICE = 'ARTIST_SERVICE';
