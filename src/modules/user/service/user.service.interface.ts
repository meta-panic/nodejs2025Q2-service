import { User } from '../model/User.model';

export interface IUsersService {
  findAll(): string[];
  findOne(id: string): User;
  create(data: { login: string; password: string }): void;
  update(id: string, updateProps: Partial<User>): void;
  delete(id: string): boolean;
}

export const USER_SERVICE = 'USER_SERVICE';
