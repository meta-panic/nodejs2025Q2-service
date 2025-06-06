import { Module } from '@nestjs/common';

import { PersistentFavoritesRepository } from './repository/favorites.repository';
import { FavoriteController } from './favorites.controller';

import { FAVORITE_SERVICE } from './service/favorite.service.interface';
import { FavoriteService } from './service/favorite.service';
import { FAVORITES_REPO } from './repository/favorites.repository.interface';


@Module({
  controllers: [FavoriteController],
  providers: [
    {
      provide: FAVORITE_SERVICE,
      useClass: FavoriteService,
    },
    {
      provide: FAVORITES_REPO,
      useClass: PersistentFavoritesRepository,
    },
  ],
  exports: [FAVORITE_SERVICE],
})
export class FavoriteModule { }
