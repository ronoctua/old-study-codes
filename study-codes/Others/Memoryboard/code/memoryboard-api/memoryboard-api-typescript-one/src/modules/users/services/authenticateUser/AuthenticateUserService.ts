import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { HandleError } from '@shared/errors/HandleError';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';

import { User } from '.prisma/client';

interface IRequest {
  usernameOrEmail: string;
  unencryptedPassword: string;
}

type IUserProfile = Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>;

interface IResponse {
  user: IUserProfile;
  refreshToken: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    usernameOrEmail,
    unencryptedPassword,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findUserByUsernameOrEmail(
      usernameOrEmail,
    );

    if (!user) {
      throw new HandleError('Incorrect authentication data.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      unencryptedPassword,
      user.password,
    );

    if (!passwordMatched) {
      throw new HandleError('Incorrect authentication data.', 401);
    }

    const {
      secretRefreshToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
    } = authConfig.jwt;

    const refreshToken = sign({}, secretRefreshToken, {
      subject: user.id.toString(),
      expiresIn: expiresInRefreshToken,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresRefreshTokenDays,
    );

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, createdAt, updatedAt, ...userProfile } = user;

    const userProfileAndRefreshToken: IResponse = {
      user: { ...userProfile },
      refreshToken,
    };

    return userProfileAndRefreshToken;
  }
}

export { AuthenticateUserService };
