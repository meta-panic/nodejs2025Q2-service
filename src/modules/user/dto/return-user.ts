import { Exclude, Expose } from 'class-transformer';
import { User } from '../model/User.model';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnUserDto {
  @ApiProperty({ description: 'The ID of the user' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'The login username of the user' })
  @Expose()
  login: string;

  @ApiProperty({ description: 'The version of the user object' })
  @Expose()
  version: number;

  @ApiProperty({
    description: 'The creation timestamp of the user (in milliseconds)',
  })
  @Expose()
  createdAt: number;

  @ApiProperty({
    description: 'The last update timestamp of the user (in milliseconds)',
  })
  @Expose()
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
