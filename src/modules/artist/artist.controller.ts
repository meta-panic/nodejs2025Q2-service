import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
  Inject,
  ParseUUIDPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ArtistService } from './service/artist.service';
import { ARTIST_SERVICE } from './service/artist.service.interface';
import { CreateArtistDto } from './dto/create-artist';
import { ReturnArtistDto } from './dto/return-artist';
import { UpdateArtistDto } from './dto/update-artist';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(
    @Inject(ARTIST_SERVICE)
    private readonly artistService: ArtistService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiResponse({
    status: 201,
    description: 'The artist has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body(ValidationPipe) dto: CreateArtistDto) {
    const createdUser = this.artistService.create(dto);

    const responce = plainToInstance(ReturnArtistDto, createdUser, {
      excludeExtraneousValues: true,
    });

    return responce;
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, description: 'Return all artists.' })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by id' })
  @ApiResponse({ status: 200, description: 'Return artist by id.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist by id' })
  @ApiResponse({
    status: 200,
    description: 'The artist has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete artist by id' })
  @ApiResponse({
    status: 204,
    description: 'The artist has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.delete(id);
  }
}
