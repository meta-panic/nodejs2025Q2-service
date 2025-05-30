import { Optional } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @ValidateIf((_, value) => value !== null)
  @Optional()
  @IsString()
  artistId: string | null; // refers to Artist

  @Expose()
  @ValidateIf((_, value) => value !== null)
  @Optional()
  @IsString()
  albumId: string | null; // refers to Album

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
