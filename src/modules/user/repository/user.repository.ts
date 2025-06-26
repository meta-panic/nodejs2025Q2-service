import { Injectable } from '@nestjs/common';

import { User } from '../model/User.model';
import { IUserRepo } from './user.repository.interface';
import { InMemoryRepo } from 'src/core/repository/fakeRepo';

@Injectable()
export class InMemoryUserRepository
  extends InMemoryRepo<User>
  implements IUserRepo
{
  create(props: User): User {
    const newEntity = { ...props } as User;
    this.entities.set(props.id, { ...props });

    return newEntity;
  }

  findByLogin(login: string) {
    for (const entity of this.entities.values()) {
      if (entity.login === login) {
        return entity;
      }
    }
    return undefined;
  }
}
