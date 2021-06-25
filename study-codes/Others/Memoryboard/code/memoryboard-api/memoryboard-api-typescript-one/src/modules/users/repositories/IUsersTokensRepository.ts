import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';

import { UserRefreshToken } from '.prisma/client';

interface IUsersTokensRepository {
  create({
    userId,
    refreshToken,
    expiresDate,
  }: ICreateUserTokenDTO): Promise<UserRefreshToken>;
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserRefreshToken | null>;
  findAllByUserId(userId: string): Promise<UserRefreshToken[] | null>;
  findAllWithOldestExpirationDate(
    baseDate: Date,
  ): Promise<UserRefreshToken[] | null>;
  deleteByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<number | null>;
  deleteManyByRefreshTokenIds(
    refreshTokenIdsArray: number[],
  ): Promise<number | null>;
}

export { IUsersTokensRepository };
