import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { HandleError } from '@shared/errors/HandleError';
import regExp from '@config/regExp';

import { User } from '.prisma/client';

interface IRequest {
  userId: string;
  currentPassword: string;
  newPassword: string;
  newUsername: string;
  newEmail: string;
  newTheme: string;
}

type IResponse = Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>;

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    userId,
    currentPassword,
    newPassword,
    newUsername,
    newEmail,
    newTheme,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new HandleError('User does not exist.', 404);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      currentPassword,
      user.password,
    );

    if (!passwordMatched) {
      throw new HandleError('Incorrect current password.', 401);
    }

    const { usernameRegExp, emailRegExp, passwordRegExp } = regExp.user;

    if (/^@/.test(newUsername) === false) {
      throw new HandleError('The username must start with: @');
    }

    if (usernameRegExp.test(newUsername) === false) {
      throw new HandleError(
        'The username must contain a minimum of 3 and a maximum of 29 lowercase letters without diacritical marks.',
      );
    }

    if (emailRegExp.test(newEmail) === false) {
      throw new HandleError('The email address does not have a valid format.');
    }

    if (passwordRegExp.test(newPassword) === false) {
      throw new HandleError(
        'The password must have a minimum of 8 and a maximum of 32 characters, and at least one uppercase and one lowercase letter.',
      );
    }

    if (user.username !== newUsername) {
      const checkIfUsernameExists =
        await this.usersRepository.findUserByUsername(newUsername);

      if (checkIfUsernameExists) {
        throw new HandleError('Username already exists.');
      }
    }

    if (user.email !== newEmail) {
      const checkIfEmailExists = await this.usersRepository.findUserByEmail(
        newEmail,
      );

      if (checkIfEmailExists) {
        throw new HandleError('Email already exists.');
      }
    }

    const newEncryptedPassword = await this.hashProvider.generateHash(
      newPassword,
    );

    const userUpdated = await this.usersRepository.updateUserById({
      userId,
      newPassword: newEncryptedPassword,
      newUsername,
      newEmail,
      newTheme,
    });

    if (!userUpdated) {
      throw new HandleError('User does not exist.', 404);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, createdAt, updatedAt, ...userProfile } = userUpdated;

    return userProfile;
  }
}

export { UpdateUserService };
