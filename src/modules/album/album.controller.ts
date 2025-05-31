import {
  Controller,
  Inject,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateAlbumDto } from './dto/create-album';
import { UpdateAlbumDto } from './dto/update-album';
import { ALBUM_SERVICE } from './service/album.service.interface';
import { AlbumService } from './service/album.service';
import { ReturnAlbumDto } from './dto/return-album';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(
    @Inject(ALBUM_SERVICE)
    private readonly albumService: AlbumService,
  ) { } // prettier-ignore

  @Post()
  @ApiOperation({ summary: 'Create a new album' })
  @ApiResponse({
    status: 201,
    description: 'The album has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body(ValidationPipe) dto: CreateAlbumDto) {
    const createdUser = this.albumService.create(dto);

    const responce = plainToInstance(ReturnAlbumDto, createdUser, {
      excludeExtraneousValues: true,
    });

    return responce;
  }

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, description: 'Return all albums.' })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by id' })
  @ApiResponse({ status: 200, description: 'Return album by id.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album by id' })
  @ApiResponse({
    status: 200,
    description: 'The album has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete album by id' })
  @ApiResponse({
    status: 204,
    description: 'The album has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.delete(id);
  }
}
