import { inject, injectable } from 'tsyringe';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { HandleError } from '@shared/errors/HandleError';

import { User } from '.prisma/client';

interface IPayload {
  sub: string;
}

type IResponse = Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>;

@injectable()
class ShowUserProfileByTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(headersAccessToken: string | undefined): Promise<IResponse> {
    if (typeof headersAccessToken === 'undefined') {
      throw new HandleError('Token undefined.');
    }

    const [, refreshToken] = headersAccessToken.split(' ');

    const { sub } = verify(
      refreshToken,
      authConfig.jwt.secretRefreshToken,
    ) as IPayload;

    if (!sub) {
      throw new HandleError('Invalid authentication!', 401);
    }

    const user = await this.usersRepository.findUserById(sub);

    if (!user) {
      throw new HandleError('Invalid authentication!', 401);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, createdAt, updatedAt, ...userProfile } = user;

    return userProfile;
  }
}

export { ShowUserProfileByTokenService };
