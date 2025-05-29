import { Injectable } from '@nestjs/common';
import { User } from '../model/User.model';
import { IUserRepo } from './user.repository.interface';
import { InMemoryRepo } from 'src/core/repository/fakeRepo';


@Injectable()
export class InMemoryUserRepository extends InMemoryRepo<User> implements IUserRepo {
}
