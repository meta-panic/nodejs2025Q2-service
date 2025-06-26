import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class AfterRegistrationDto {
  @ApiProperty({ description: 'Id of created user' })
  @Expose()
  @IsNotEmpty()
  id: string;

  constructor(args: { id: string }) {
    Object.assign(this, args);
  }
}
