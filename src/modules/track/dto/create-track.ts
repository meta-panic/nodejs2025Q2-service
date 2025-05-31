import { Optional } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ description: 'The name of the track' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The ID of the artist, can be null',
    nullable: true,
  })
  @Expose()
  @ValidateIf((_, value) => value !== null)
  @Optional()
  @IsString()
  artistId: string | null; // refers to Artist

  @ApiProperty({
    description: 'The ID of the album, can be null',
    nullable: true,
  })
  @Expose()
  @ValidateIf((_, value) => value !== null)
  @Optional()
  @IsString()
  albumId: string | null; // refers to Album

  @ApiProperty({ description: 'The duration of the track in seconds' })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
