import { inject, injectable } from 'tsyringe';

import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';

import { UserRefreshToken } from '.prisma/client';

interface IResponse {
  numberOfDeletedTokens: number | null;
  deletedTokens: UserRefreshToken[];
}

@injectable()
class DeleteExpiredTokensService {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(): Promise<IResponse | null> {
    const baseDate = this.dateProvider.dateNow();

    const expiredTokens =
      await this.usersTokensRepository.findAllWithOldestExpirationDate(
        baseDate,
      );

    if (expiredTokens) {
      let expiredTokenIdsArray: number[] = [];

      expiredTokens.forEach((expiredToken) => {
        expiredTokenIdsArray = [expiredToken.id, ...expiredTokenIdsArray];
      });

      const numberOfDeletedExpiredTokens =
        await this.usersTokensRepository.deleteManyByRefreshTokenIds(
          expiredTokenIdsArray,
        );

      const deletedTokens = {
        numberOfDeletedTokens: numberOfDeletedExpiredTokens,
        deletedTokens: expiredTokens,
      };

      return deletedTokens;
    }

    return null;
  }
}

export { DeleteExpiredTokensService };
