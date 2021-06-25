import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { HandleError } from '@shared/errors/HandleError';

import { User } from '.prisma/client';

type UserProfile = Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>;

@injectable()
class ListAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<UserProfile[]> {
    const users = await this.usersRepository.findAllUsers();

    if (!users) {
      throw new HandleError('Users does not exist!', 404);
    }

    let allUsersProfiles: UserProfile[] = [];

    users.forEach((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, password, createdAt, updatedAt, ...userProfile } = user;

      allUsersProfiles = [userProfile, ...allUsersProfiles];
    });

    return allUsersProfiles;
  }
}

export { ListAllUsersService };
