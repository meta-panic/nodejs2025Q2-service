import { Module } from '@nestjs/common';

import { UsersController } from './user.controller';
import { UsersService } from './service/user.service';
import { USER_REPO } from './repository/user.repository.interface';
import { USER_SERVICE } from './service/user.service.interface';
import { PostgresUserRepository } from './repository/postgres.repository';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UsersService,
    },
    {
      provide: USER_REPO,
      useClass: PostgresUserRepository,
    },
  ],
  imports: [],
  exports: [USER_SERVICE],
})
export class UsersModule { }
