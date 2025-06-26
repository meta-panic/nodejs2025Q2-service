import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { AUTH_SERVICE } from './service/auth.service.interface';
import { AuthService } from './service/auth.service';
import { UsersModule } from '../user/user.module';


@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
  imports: [UsersModule]
})
export class AuthModule { }
