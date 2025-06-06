import { Track } from '../model/Track.model';

export interface ITrackService {
  findAll(): Promise<Track[]>;
  findOne(id: string): Promise<Track>;
  create(data: {
    name: string;
    duration: number;
    artistId: string | null;
    albumId: string | null;
  }): Promise<Track>;
  update(id: string, updateProps: Partial<Track>): Promise<void>;
  delete(id: string): Promise<boolean>;
}

export const TRACK_SERVICE = 'TRACK_SERVICE';
