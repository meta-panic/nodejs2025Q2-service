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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('favorites')
@Controller('favs')
export class FavoriteController {
  constructor(
    @Inject(FAVORITE_SERVICE)
    private readonly favoriteService: FavoriteService,
  ) { } // prettier-ignore

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: 200,
    description: 'Return all favorites including artists, albums, and tracks.',
  })
  getAll() {
    return this.favoriteService.findAll();
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiResponse({
    status: 201,
    description: 'Track successfully added to favorites.',
  })
  @ApiResponse({ status: 400, description: 'Bad request (invalid trackId).' })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Entity (track with id does not exist).',
  })
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiResponse({
    status: 201,
    description: 'Album successfully added to favorites.',
  })
  @ApiResponse({ status: 400, description: 'Bad request (invalid albumId).' })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Entity (album with id does not exist).',
  })
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addAlbum(id);
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiResponse({
    status: 201,
    description: 'Artist successfully added to favorites.',
  })
  @ApiResponse({ status: 400, description: 'Bad request (invalid artistId).' })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Entity (artist with id does not exist).',
  })
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.addArtist(id);
  }

  @HttpCode(204)
  @Delete('track/:id')
  @ApiOperation({ summary: 'Remove track from favorites' })
  @ApiResponse({
    status: 204,
    description: 'Track successfully removed from favorites.',
  })
  @ApiResponse({ status: 400, description: 'Bad request (invalid trackId).' })
  @ApiResponse({ status: 404, description: 'Track not found in favorites.' })
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.deleteTrack(id);
  }

  @HttpCode(204)
  @Delete('album/:id')
  @ApiOperation({ summary: 'Remove album from favorites' })
  @ApiResponse({
    status: 204,
    description: 'Album successfully removed from favorites.',
  })
  @ApiResponse({ status: 400, description: 'Bad request (invalid albumId).' })
  @ApiResponse({ status: 404, description: 'Album not found in favorites.' })
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.deleteAlbum(id);
  }

  @HttpCode(204)
  @Delete('artist/:id')
  @ApiOperation({ summary: 'Remove artist from favorites' })
  @ApiResponse({
    status: 204,
    description: 'Artist successfully removed from favorites.',
  })
  @ApiResponse({ status: 400, description: 'Bad request (invalid artistId).' })
  @ApiResponse({ status: 404, description: 'Artist not found in favorites.' })
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.deleteArtist(id);
  }
}
