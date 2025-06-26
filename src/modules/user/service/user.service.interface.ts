import { User } from '../model/User.model';

type ChangePassword = { oldPassword: string; newPassword: string };
export interface IUsersService {
  findAll(): User[];
  findOne(id: string): User;
  create(data: { login: string; password: string }): User;
  update(id: string, updateProps: Partial<User>): void;
  delete(id: string): boolean;
  updatePassword(
    id: string,
    { oldPassword, newPassword }: ChangePassword,
  ): User;
}

export const USER_SERVICE = 'USER_SERVICE';
