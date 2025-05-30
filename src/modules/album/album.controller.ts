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
import { ReturnUserDto } from '../user/dto/return-user';
import { CreateAlbumDto } from './dto/create-album';
import { UpdateAlbumDto } from './dto/update-album';
import { ALBUM_SERVICE } from './service/album.service.interface';
import { AlbumService } from './service/album.service';
import { ReturnAlbumDto } from './dto/return-album';

@Controller('album')
export class AlbumController {
  constructor(
    @Inject(ALBUM_SERVICE)
    private readonly albumService: AlbumService,
  ) { } // prettier-ignore

  @Post()
  create(@Body(ValidationPipe) dto: CreateAlbumDto) {
    const createdUser = this.albumService.create(dto);

    const responce = plainToInstance(ReturnAlbumDto, createdUser, {
      excludeExtraneousValues: true,
    });

    return responce;
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.delete(id);
  }
}
