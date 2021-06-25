import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository';
import { HandleError } from '@shared/errors/HandleError';

export async function ensureAdminStatus(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findUserById(id);

  if (!user) {
    throw new HandleError('User does not exist!', 404);
  } else if (!user.isAdmin) {
    throw new HandleError('User is not admin!', 401);
  }

  return next();
}
