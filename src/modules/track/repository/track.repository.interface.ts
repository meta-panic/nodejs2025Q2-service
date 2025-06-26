import { IRepo } from 'src/core/repository/repository.interface';
import { Track } from '../model/Track.model';

export type ITrackRepo = IRepo<Track>;
// & {
//   findByLogin: (name: User['login']) => Album | undefined;
// };

export const TRACK_REPO = 'TRACK_REPO';
