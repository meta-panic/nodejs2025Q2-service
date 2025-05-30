import { Module } from '@nestjs/common';

import { InMemoryTrackRepository } from './repository/track.repository';
import { TrackController } from './track.controller';
import { TRACK_REPO } from './repository/track.repository.interface';
import { TRACK_SERVICE } from './service/track.service.interface';
import { TrackService } from './service/track.service';

@Module({
  controllers: [TrackController],
  providers: [
    {
      provide: TRACK_SERVICE,
      useClass: TrackService,
    },
    {
      provide: TRACK_REPO,
      useClass: InMemoryTrackRepository,
    },
  ],
  exports: [TRACK_SERVICE]
})
export class TrackModule { } // prettier-ignore
