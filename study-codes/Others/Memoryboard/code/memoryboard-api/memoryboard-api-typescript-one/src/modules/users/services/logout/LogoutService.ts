import { inject, injectable } from 'tsyringe';

import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';

interface IRequest {
  userId: string;
  headersAccessToken: string | undefined;
}

interface IResponse {
  numberOfDeletedTokens: number;
}

@injectable()
class LogoutService {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  async execute({
    userId,
    headersAccessToken,
  }: IRequest): Promise<IResponse | null> {
    if (typeof headersAccessToken === 'string') {
      const [, token] = headersAccessToken.split(' ');
      let numberOfDeletedTokens = 0;

      const tokenDeleted =
        await this.usersTokensRepository.deleteByUserIdAndRefreshToken(
          userId,
          token,
        );

      if (typeof tokenDeleted === 'number') {
        numberOfDeletedTokens = tokenDeleted;
      }

      return {
        numberOfDeletedTokens,
      };
    }

    return null;
  }
}

export { LogoutService };
