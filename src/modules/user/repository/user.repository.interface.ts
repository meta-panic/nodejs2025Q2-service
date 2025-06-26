import { IRepoAsync } from 'src/core/repository/repository.interface';
import { User } from '../model/User.model';

export type IUserRepo = IRepoAsync<User> & {
  findByLogin: (name: User['login']) => Promise<User | undefined>;
};

export const USER_REPO = 'USER_REPO';
