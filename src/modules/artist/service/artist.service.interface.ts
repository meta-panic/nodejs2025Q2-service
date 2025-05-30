import { Artist } from "../model/Artist.model";


export interface IArtistService {
  findAll(): Artist[];
  findOne(id: string): Artist;
  create(data: { name: string; grammy: boolean }): Artist;
  update(id: string, updateProps: Partial<Artist>): void;
  delete(id: string): boolean;
}

export const ARTIST_SERVICE = 'ARTIST_SERVICE';

