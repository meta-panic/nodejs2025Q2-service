import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { IUserRepo, USER_REPO } from '../repository/user.repository.interface';
import { generateUUID } from 'src/core/utils';
import { User } from '../model/User.model';
import { IUsersService } from './user.service.interface';
import { plainToInstance } from 'class-transformer';
import { ReturnUserDto } from '../dto/return-user';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: IUserRepo,
  ) {}

  findAll() {
    const responce = this.userRepo.findAll().map((user) => {
      return plainToInstance(ReturnUserDto, user, {
        excludeExtraneousValues: true,
      });
    });

    return responce;
  }

  findOne(id: string) {
    const user = this.userRepo.findById(id);

    if (!user) throw new NotFoundException('User Not Found');

    return plainToInstance(ReturnUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  create(data: { login: string; password: string }) {
    const currentDate = Date.now();

    return this.userRepo.create({
      login: data.login,
      password: data.password,
      id: generateUUID(),
      updatedAt: currentDate,
      createdAt: currentDate,
      version: 1,
    });
  }

  update(id: string, updateProps: Partial<User>) {
    this.userRepo.update(id, updateProps);
  }

  delete(id: string) {
    const isSuccess = this.userRepo.delete(id);

    return isSuccess;
  }

  updatePassword(
    id: string,
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
  ) {
    const user = this.userRepo.findById(id);

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is not correct.');
    }

    const result = this.userRepo.update(id, { password: newPassword });
    this.userRepo.update(id, {
      version: user.version + 1,
      updatedAt: Date.now(),
    });

    return plainToInstance(ReturnUserDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
