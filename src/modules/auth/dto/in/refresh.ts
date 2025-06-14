import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({ description: 'Login of a user that wants refresh current session' })
  @IsNotEmpty()
  @IsString()
  login: string;
}
