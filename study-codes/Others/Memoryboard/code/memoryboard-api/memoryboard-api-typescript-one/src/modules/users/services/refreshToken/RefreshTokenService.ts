import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { HandleError } from '@shared/errors/HandleError';

interface IRequest {
  userId: string;
  headersAccessToken: string | undefined;
}

interface IPayload {
  sub: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ userId, headersAccessToken }: IRequest): Promise<string> {
    if (typeof headersAccessToken === 'undefined') {
      throw new HandleError('Token undefined.');
    }

    const [, refreshToken] = headersAccessToken.split(' ');

    const { sub } = verify(
      refreshToken,
      authConfig.jwt.secretRefreshToken,
    ) as IPayload;

    if (userId !== sub) {
      throw new HandleError('Invalid user id.');
    }

    const tokenDeleted =
      await this.usersTokensRepository.deleteByUserIdAndRefreshToken(
        userId,
        refreshToken,
      );

    if (tokenDeleted !== 1) {
      throw new HandleError('Refresh Token does not exists!', 404);
    }

    const newRefreshToken = sign({}, authConfig.jwt.secretRefreshToken, {
      subject: sub,
      expiresIn: authConfig.jwt.expiresInRefreshToken,
    });

    const expiresDate = this.dateProvider.addDays(
      authConfig.jwt.expiresRefreshTokenDays,
    );

    await this.usersTokensRepository.create({
      expiresDate,
      refreshToken: newRefreshToken,
      userId,
    });

    return newRefreshToken;
  }
}

export { RefreshTokenService };
