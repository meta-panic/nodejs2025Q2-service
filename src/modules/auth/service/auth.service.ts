import { ForbiddenException, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { verify } from 'jsonwebtoken';

import { ReturnTokensDto } from '../dto/out/return-tokens';

import { IAuthService } from './auth.service.interface';
import { Tokens } from '../model/Tokens.model';
import getTokens from 'src/core/crypt/getTokens';
import validatePassword from 'src/core/crypt/validatePassword';
import saltPassword from 'src/core/crypt/saltPassword';
import { AfterRegistrationDto } from '../dto/out/afterRegistration';
import { IUsersService, USER_SERVICE } from 'src/modules/user/service/user.service.interface';


@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUsersService
  ) { }
  async signup(data: { login: string; password: string }): Promise<{ id: string }> {
    try {
      const existingUser = await this.userService.findByLogin(data.login);

      if (existingUser) {
        throw new UnprocessableEntityException(`Client with login ${data.login} already exists`);
      }
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
    }

    const saltedPassword = await saltPassword(data.password);
    const createdUser = await this.userService.create({ password: saltedPassword, login: data.login });

    return plainToInstance(AfterRegistrationDto, createdUser, {
      excludeExtraneousValues: true,
    });
  }

  async login(data: { login: string; password: string }): Promise<Tokens> {
    const user = await this.userService.findByLogin(data.login);
    if (!user) {
      throw new ForbiddenException(`Client with login ${data.login} not found`);
    }

    if (!(await validatePassword(data.password, user.password))) {
      throw new ForbiddenException(`Password is not correct`);
    }

    const tokens = await getTokens(data.login, user.id, process.env.JWT_SECRET_KEY);

    return plainToInstance(ReturnTokensDto, tokens, {
      excludeExtraneousValues: true,
    });
  }

  async refresh(refreshToken: string): Promise<Tokens> {
    try {
      const decoded = verify(refreshToken, process.env.JWT_SECRET_REFRESH_KEY) as { login: string; userId: string };

      const tokens = await getTokens(decoded.login, decoded.userId, process.env.JWT_SECRET_KEY);
      return tokens;
    } catch (error) {
      throw new ForbiddenException('Invalid refresh token');
    }
  }
}
