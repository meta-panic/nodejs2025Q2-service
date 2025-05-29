import { IRepo } from "src/core/repository/repository.interface";
import { User } from "../model/User.model";


export type IUserRepo = IRepo<User>;

export const USER_REPO = 'USER_REPO';

