import { Track } from '../model/Track.model';

export interface ITrackService {
  findAll(): Track[];
  findOne(id: string): Track;
  create(data: {
    name: string;
    duration: number;
    artistId: string | null;
    albumId: string | null;
  }): Track;
  update(id: string, updateProps: Partial<Track>): void;
  delete(id: string): boolean;
}

export const TRACK_SERVICE = 'TRACK_SERVICE';
