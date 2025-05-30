import { Optional } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @Expose()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @Optional()
  artistId: string | null; // refers to Artist
}
