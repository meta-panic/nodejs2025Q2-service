import { Module } from '@nestjs/common';

import { InMemoryUserRepository } from './user/repository/user.repository';
import { UsersController } from './user/user.controller';
import { UsersService } from './user/service/user.service';
import { IUserRepo, USER_REPO } from './user/repository/user.repository.interface';
import { USER_SERVICE } from './user/service/user.service.interface';


@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UsersService,
    },
    {
      provide: USER_REPO,
      useClass: InMemoryUserRepository,
    }
  ],
})
export class UsersModule { }
