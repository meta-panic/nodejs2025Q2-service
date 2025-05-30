import { Module } from '@nestjs/common';

import { InMemoryUserRepository } from './repository/user.repository';
import { UsersController } from './user.controller';
import { UsersService } from './service/user.service';
import { IUserRepo, USER_REPO } from './repository/user.repository.interface';
import { USER_SERVICE } from './service/user.service.interface';


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
