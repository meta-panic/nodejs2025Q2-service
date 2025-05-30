import { IRepo } from "src/core/repository/repository.interface";
import { User } from "../model/User.model";


export type IUserRepo = IRepo<User>
  & { findByLogin: (name: User['login']) => User | undefined };

export const USER_REPO = 'USER_REPO';

