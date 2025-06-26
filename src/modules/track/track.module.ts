import { forwardRef, Module } from '@nestjs/common';

import { TrackController } from './track.controller';
import { TRACK_REPO } from './repository/track.repository.interface';
import { TRACK_SERVICE } from './service/track.service.interface';
import { TrackService } from './service/track.service';
import { FavoriteModule } from '../favorites/favorites.module';
import { PersistentTrackRepository } from './repository/track.repository';

@Module({
  controllers: [TrackController],
  providers: [
    {
      provide: TRACK_SERVICE,
      useClass: TrackService,
    },
    {
      provide: TRACK_REPO,
      useClass: PersistentTrackRepository,
    },
  ],
  exports: [TRACK_SERVICE],
  imports: [forwardRef(() => FavoriteModule)],
})
export class TrackModule { }
