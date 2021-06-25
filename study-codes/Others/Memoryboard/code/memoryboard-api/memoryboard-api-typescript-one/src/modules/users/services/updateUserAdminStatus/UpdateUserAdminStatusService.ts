import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { HandleError } from '@shared/errors/HandleError';

import { User } from '.prisma/client';

type IResponse = Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>;

@injectable()
class UpdateUserAdminStatusService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(username: string, newAdminStatus: boolean): Promise<IResponse> {
    const user = await this.usersRepository.updateUserAdminStatusByUsername({
      username,
      newAdminStatus,
    });

    if (!user) {
      throw new HandleError('User does not exist.', 404);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, createdAt, updatedAt, ...userProfile } = user;

    return userProfile;
  }
}

export { UpdateUserAdminStatusService };
