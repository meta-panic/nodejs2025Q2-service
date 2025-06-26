import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ description: 'Login for a new user' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ description: 'Password for a new user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
