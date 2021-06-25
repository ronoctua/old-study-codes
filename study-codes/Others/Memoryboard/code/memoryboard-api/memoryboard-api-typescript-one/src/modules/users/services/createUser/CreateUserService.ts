import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { HandleError } from '@shared/errors/HandleError';
import regExp from '@config/regExp';

import { User } from '.prisma/client';

interface IRequest {
  username: string;
  email: string;
  unencryptedPassword: string;
}

type IResponse = Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>;

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    username,
    email,
    unencryptedPassword,
  }: IRequest): Promise<IResponse> {
    const { usernameRegExp, emailRegExp, passwordRegExp } = regExp.user;

    if (/^@/.test(username) === false) {
      throw new HandleError('The username must start with: @');
    }

    if (usernameRegExp.test(username) === false) {
      throw new HandleError(
        'The username must contain a minimum of 3 and a maximum of 29 lowercase letters without diacritical marks.',
      );
    }

    if (emailRegExp.test(email) === false) {
      throw new HandleError('The email address does not have a valid format.');
    }

    if (passwordRegExp.test(unencryptedPassword) === false) {
      throw new HandleError(
        'The password must have a minimum of 8 and a maximum of 32 characters, and at least one uppercase and one lowercase letter.',
      );
    }

    const checkIfUsernameExists = await this.usersRepository.findUserByUsername(
      username,
    );

    if (checkIfUsernameExists) {
      throw new HandleError('Username already exists.');
    }

    const checkIfEmailExists = await this.usersRepository.findUserByEmail(
      email,
    );

    if (checkIfEmailExists) {
      throw new HandleError('Email already exists.');
    }

    const encryptedPassword = await this.hashProvider.generateHash(
      unencryptedPassword,
    );

    const user = await this.usersRepository.createUser({
      username,
      email,
      password: encryptedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, createdAt, updatedAt, ...userProfile } = user;

    return userProfile;
  }
}

export { CreateUserService };
