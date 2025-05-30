import { Exclude, Expose } from 'class-transformer';
import { User } from '../model/User.model';

export class ReturnUserDto {
  @Expose()
  id: string;

  @Expose()
  login: string;

  @Expose()
  version: number;

  @Expose()
  createdAt: number;

  @Expose()
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
