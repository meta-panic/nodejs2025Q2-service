import { User } from '../model/User.model';

type ChangePassword = { oldPassword: string; newPassword: string };
export interface IUsersService {
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  create(data: { login: string; password: string }): Promise<User>;
  update(id: string, updateProps: Partial<User>): Promise<void>;
  delete(id: string): Promise<boolean>;
  updatePassword(
    id: string,
    { oldPassword, newPassword }: ChangePassword,
  ): Promise<User>;
}

export const USER_SERVICE = 'USER_SERVICE';
