import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { UsersTokensRepository } from '@modules/users/infra/prisma/repositories/UsersTokensRepository';
import { HandleError } from '@shared/errors/HandleError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new HandleError('Token is missing.', 401);
  }

  const [, refreshToken] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      refreshToken,
      authConfig.jwt.secretRefreshToken,
    ) as IPayload;

    const databaseUserRefreshToken =
      await usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        refreshToken,
      );

    if (!databaseUserRefreshToken) {
      throw new HandleError('Invalid token.', 401);
    }

    request.user = {
      id: userId,
    };

    return next();
  } catch (error) {
    throw new HandleError('Invalid token.', 401);
  }
}
