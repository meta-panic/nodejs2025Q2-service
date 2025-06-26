import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The login username for the user' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ description: 'The password for the user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
