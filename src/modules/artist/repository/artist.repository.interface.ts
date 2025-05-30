import { IRepo } from "src/core/repository/repository.interface";
import { Artist } from "../model/Artist.model";


export type IArtistRepo = IRepo<Artist>;

export const ARTIST_REPO = 'ARTIST_REPO';

