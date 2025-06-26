import { Tokens } from '../model/Tokens.model';


export interface IAuthService {
  signup(data: { login: string; password: string }): Promise<{ id: string }>;
  login(data: { login: string; password: string }): Promise<Tokens>;
  refresh(refreshToken: string): Promise<Tokens>;
}

export const AUTH_SERVICE = 'AUTH_SERVICE';
