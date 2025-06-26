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
import { CreateTrackDto } from './dto/create-track';
import { ReturnTrackDto } from './dto/return-track';
import { UpdateTrackDto } from './dto/update-track';
import { TrackService } from './service/track.service';
import { TRACK_SERVICE } from './service/track.service.interface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(
    @Inject(TRACK_SERVICE)
    private readonly trackService: TrackService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a new track' })
  @ApiResponse({
    status: 201,
    description: 'The track has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body(ValidationPipe) dto: CreateTrackDto) {
    const createdTrack = this.trackService.create(dto);

    const responce = plainToInstance(ReturnTrackDto, createdTrack, {
      excludeExtraneousValues: true,
    });

    return responce;
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, description: 'Return all tracks.' })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by id' })
  @ApiResponse({ status: 200, description: 'Return track by id.' })
  @ApiResponse({ status: 400, description: 'Bad request (invalid trackId).' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track by id' })
  @ApiResponse({
    status: 200,
    description: 'The track has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete track by id' })
  @ApiResponse({
    status: 204,
    description: 'The track has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Bad request (invalid trackId).' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.delete(id);
  }
}
