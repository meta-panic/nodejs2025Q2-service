import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { IUserRepo, USER_REPO } from '../repository/user.repository.interface';
import { generateUUID } from 'src/core/utils';
import { User } from '../model/User.model';
import { IUsersService } from './user.service.interface';


@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: IUserRepo
  ) { }

  findAll() {
    return this.userRepo.findAll();
  }

  findOne(id: string) {
    const user = this.userRepo.findById(id)

    if (!user) throw new NotFoundException('User Not Found')

    return user;
  }

  create(data: { login: string; password: string }) {
    const currentDate = Date.now();

    this.userRepo.create({
      login: data.login,
      password: data.password,
      id: generateUUID(),
      updatedAt: currentDate,
      createdAt: currentDate,
      version: 1
    });
  }

  update(id: string, updateProps: Partial<User>) {
    this.userRepo.update(id, updateProps)
  }

  delete(id: string) {
    const isSuccess = this.userRepo.delete(id);
    return isSuccess;
  }
}