import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { HandleError } from '@shared/errors/HandleError';

import { User } from '.prisma/client';

type IResponse = Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>;

@injectable()
class ShowUserDataService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string | number): Promise<IResponse> {
    const user = await this.usersRepository.findUserAndNotesById(userId);

    if (!user) {
      throw new HandleError('User does not exist!', 404);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, createdAt, updatedAt, ...userData } = user;

    return userData;
  }
}

export { ShowUserDataService };
