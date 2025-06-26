import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { IUserRepo, USER_REPO } from '../repository/user.repository.interface';
import { generateTimestamp, generateUUID } from 'src/core/utils';
import { User } from '../model/User.model';
import { IUsersService } from './user.service.interface';
import { plainToInstance } from 'class-transformer';
import { ReturnUserDto } from '../dto/return-user';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: IUserRepo,
  ) { }

  async findAll() {
    const responce = (await this.userRepo.findAll()).map((user) => {
      return plainToInstance(ReturnUserDto, user, {
        excludeExtraneousValues: true,
      });
    });

    return responce;
  }

  async findOne(id: string) {
    const user = await this.userRepo.findById(id);

    if (!user) throw new NotFoundException('User Not Found');

    return plainToInstance(ReturnUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async create(data: { login: string; password: string }) {
    const currentDate = generateTimestamp();

    return await this.userRepo.create({
      login: data.login,
      password: data.password,
      id: generateUUID(),
      updatedAt: currentDate,
      createdAt: currentDate,
      version: 1,
    });
  }

  async update(id: string, updateProps: Partial<User>) {
    await this.userRepo.update(id, updateProps);
  }

  delete(id: string) {
    const isSuccess = this.userRepo.delete(id);

    return isSuccess;
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
  ) {
    const user = await this.userRepo.findById(id);

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is not correct.');
    }

    const result = await this.userRepo.update(id, { password: newPassword });
    await this.userRepo.update(id, {
      version: user.version + 1,
      updatedAt: generateTimestamp(),
    });

    return plainToInstance(ReturnUserDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
