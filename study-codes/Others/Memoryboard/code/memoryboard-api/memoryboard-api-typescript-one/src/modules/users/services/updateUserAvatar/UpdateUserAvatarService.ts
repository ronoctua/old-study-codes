import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { HandleError } from '@shared/errors/HandleError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import { User } from '.prisma/client';

interface IRequest {
  userId: string;
  avatarFile: string;
}

type IResponse = Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>;

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new HandleError('User does not exist.', 404);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const userUpdated = await this.usersRepository.updateUserAvatarById({
      userId,
      userAvatar: avatarFile,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, createdAt, updatedAt, ...userProfile } = userUpdated;

    return userProfile;
  }
}

export { UpdateUserAvatarService };
