import {
  Controller,
  Inject,
  Post,
  Get,
  Param,
  HttpCode,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { FAVORITE_SERVICE } from './service/favorite.service.interface';
import { FavoriteService } from './service/favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(
    @Inject(FAVORITE_SERVICE)
    private readonly favoriteService: FavoriteService,
  ) { } // prettier-ignore

  @Get()
  getAll() {
    return this.favoriteService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addArtist(id);
  }

  @HttpCode(204)
  @Delete('track/:id')
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.deleteTrack(id);
  }

  @HttpCode(204)
  @Delete('album/:id')
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.deleteAlbum(id);
  }

  @HttpCode(204)
  @Delete('artist/:id')
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.deleteArtist(id);
  }
}
