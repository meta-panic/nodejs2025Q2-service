import { IRepoAsync } from 'src/core/repository/repository.interface';
import { Track } from '../model/Track.model';

export type ITrackRepo = IRepoAsync<Track>;

export const TRACK_REPO = 'TRACK_REPO';
