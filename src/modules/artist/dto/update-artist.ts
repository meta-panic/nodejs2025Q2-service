import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto {
  @ApiProperty({ description: 'The updated name of the artist' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Indicates if the artist has won a Grammy' })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
