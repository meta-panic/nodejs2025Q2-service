import { Optional } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({ description: 'The name of the album' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The release year of the album' })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'The ID of the artist, can be null',
    nullable: true,
  })
  @Expose()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @Optional()
  artistId: string | null; // refers to Artist
}
