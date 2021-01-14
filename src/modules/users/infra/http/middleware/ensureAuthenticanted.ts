import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function checkToken(exp: any) {
  if (Date.now() <= exp * 1000) {
    console.log(true, 'token is not expired');
  } else {
    console.log(false, 'token is expired');
  }
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }
  const [, token] = authHeader.split(' ');

  try {

    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {

    if (err.name === 'TokenExpiredError') {
      /*const decoded = verify(token, authConfig.jwt.secret, {
        ignoreExpiration: true,
      });*/

      console.log('===>> meu decoded', err.name);

      // your code
      console.log('renovar token');
    }

    throw new AppError('Invalid JWT token', 401);
  }
}
