import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';
import auth from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

interface IRequest extends Request {
  header: any;
}

export default function ensureAuthenticated(
  request: IRequest,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  console.log('ensure', authHeader);

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  const { secret } = auth.jwt;

  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };
    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
