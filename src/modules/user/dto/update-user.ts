import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'The old password of the user' })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: 'The new password for the user' })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
