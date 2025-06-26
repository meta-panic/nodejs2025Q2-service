import { sign } from 'jsonwebtoken';


const signJWT = async (login: string, id: string, secret: string): Promise<{ accessToken: string; refreshToken: string }> => {
  const token = await new Promise<string>((resolve, reject) => {
    sign(
      {
        login: login,
        userId: id,
      },
      process.env.JWT_SECRET_REFRESH_KEY || secret,
      {
        algorithm: 'HS256',
        expiresIn: process.env.TOKEN_EXPIRE_TIME
      },
      (err, token) => {
        if (err) reject(err);
        else if (token) resolve(token);
      }
    );
  });

  const refreshToken = await new Promise<string>((resolve, reject) => {
    sign(
      {
        login: login,
        userId: id,
      },
      process.env.JWT_SECRET_REFRESH_KEY || secret,
      {
        algorithm: 'HS256',
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME
      },
      (err, token) => {
        if (err) reject(err);
        else if (token) resolve(token);
      }
    );
  });

  return { accessToken: token, refreshToken: refreshToken };
}


export default signJWT;
