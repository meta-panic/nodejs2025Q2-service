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

@Controller('track')
export class TrackController {
  constructor(
    @Inject(TRACK_SERVICE)
    private readonly trackService: TrackService,
  ) { } // prettier-ignore

  @Post()
  create(@Body(ValidationPipe) dto: CreateTrackDto) {
    const createdTrack = this.trackService.create(dto);

    const responce = plainToInstance(ReturnTrackDto, createdTrack, {
      excludeExtraneousValues: true,
    });

    return responce;
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) dto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.delete(id);
  }
}
