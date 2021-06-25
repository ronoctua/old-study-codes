import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { PrismaClient, UserRefreshToken } from '@prisma/client';

const prisma = new PrismaClient();

class UsersTokensRepository implements IUsersTokensRepository {
  async create({
    userId,
    refreshToken,
    expiresDate,
  }: ICreateUserTokenDTO): Promise<UserRefreshToken> {
    const userRefreshToken = await prisma.userRefreshToken.create({
      data: {
        userId: Number(userId),
        refreshToken,
        expiresDate,
      },
    });

    return userRefreshToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string | number,
    refreshToken: string,
  ): Promise<UserRefreshToken | null> {
    const userRefreshToken = await prisma.userRefreshToken.findFirst({
      where: {
        AND: {
          userId: Number(userId),
          refreshToken,
        },
      },
    });

    return userRefreshToken;
  }

  async findAllByUserId(
    userId: string | number,
  ): Promise<UserRefreshToken[] | null> {
    const userRefreshTokens = await prisma.userRefreshToken.findMany({
      where: {
        userId: Number(userId),
      },
    });

    return userRefreshTokens;
  }

  async findAllWithOldestExpirationDate(
    baseDate: Date,
  ): Promise<UserRefreshToken[] | null> {
    const tokensArray = await prisma.userRefreshToken.findMany({
      where: {
        expiresDate: {
          lt: baseDate,
        },
      },
    });

    return tokensArray;
  }

  async deleteByUserIdAndRefreshToken(
    userId: string | number,
    refreshToken: string,
  ): Promise<number | null> {
    const userRefreshToken = await prisma.userRefreshToken.deleteMany({
      where: {
        AND: {
          userId: Number(userId),
          refreshToken,
        },
      },
    });

    return userRefreshToken.count;
  }

  async deleteManyByRefreshTokenIds(
    refreshTokenIdsArray: number[],
  ): Promise<number | null> {
    const userRefreshToken = await prisma.userRefreshToken.deleteMany({
      where: {
        id: {
          in: refreshTokenIdsArray,
        },
      },
    });

    return userRefreshToken.count;
  }
}

export { UsersTokensRepository };
