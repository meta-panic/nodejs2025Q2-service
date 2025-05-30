import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe, Inject, ParseUUIDPipe, Put, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ArtistService } from './service/artist.service';
import { ARTIST_SERVICE } from './service/artist.service.interface';
import { CreateArtistDto } from './dto/create-artist';
import { ReturnArtistDto } from './dto/return-artist';
import { UpdateArtistDto } from './dto/update-artist';


@Controller('artist')
export class ArtistController {

  constructor(
    @Inject(ARTIST_SERVICE)
    private readonly artistService: ArtistService
  ) { }

  @Post()
  create(@Body(ValidationPipe) dto: CreateArtistDto) {
    const createdUser = this.artistService.create(dto);

    const responce = plainToInstance(ReturnArtistDto, createdUser, {
      excludeExtraneousValues: true,
    });

    return responce;
  }

  @Get()
  findAll() {
    return this.artistService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.findOne(id)
  }

  @Put(':id')
  updatePassword(@Param('id', new ParseUUIDPipe()) id: string, @Body(ValidationPipe) dto: UpdateArtistDto) {
    return this.artistService.update(id, dto);
  }


  @HttpCode(204)
  @Delete(':id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.delete(id);
  }
}

