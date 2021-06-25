import { container, inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { HandleError } from '@shared/errors/HandleError';
import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { DeleteUserNoteService } from '@modules/notes/services/deleteUserNote/DeleteUserNoteService';

import { User } from '.prisma/client';

type IResponse = Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>;

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute(userId: string): Promise<IResponse> {
    const user = await this.usersRepository.findUserAndNotesById(userId);

    if (!user) {
      throw new HandleError('Error when trying to delete the user.', 400);
    }

    const userTokens = await this.usersTokensRepository.findAllByUserId(userId);

    if (userTokens) {
      let refreshTokenIdsArray: number[] = [];

      userTokens.forEach((userToken) => {
        refreshTokenIdsArray = [userToken.id, ...refreshTokenIdsArray];
      });

      await this.usersTokensRepository.deleteManyByRefreshTokenIds(
        refreshTokenIdsArray,
      );
    }

    if (user.notes.length > 0) {
      const deleteUserNoteService = container.resolve(DeleteUserNoteService);

      for (let index = 0; index < user.notes.length; index += 1) {
        const note = user.notes[index];

        // eslint-disable-next-line no-await-in-loop
        const deletedNote = await deleteUserNoteService.execute({
          userId,
          noteId: `${note.noteId}`,
        });

        if (!deletedNote) {
          throw new HandleError('Error when trying to delete the user note.');
        }
      }
    }

    const deletedUser = await this.usersRepository.deleteUser(userId);

    if (!deletedUser) {
      throw new HandleError('User does not exist', 404);
    }

    if (deletedUser.avatar) {
      await this.storageProvider.deleteFile(deletedUser.avatar);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, createdAt, updatedAt, ...userProfile } = deletedUser;

    return userProfile;
  }
}

export { DeleteUserService };
