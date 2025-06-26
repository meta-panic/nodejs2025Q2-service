import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Tokens } from '../../model/Tokens.model';


export class ReturnTokensDto {
  @ApiProperty({ description: 'Token' })
  @Expose()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({ description: 'Refresh token' })
  @Expose()
  @IsNotEmpty()
  refreshToken: string;

  constructor(args: Tokens) {
    Object.assign(this, args);
  }
}
