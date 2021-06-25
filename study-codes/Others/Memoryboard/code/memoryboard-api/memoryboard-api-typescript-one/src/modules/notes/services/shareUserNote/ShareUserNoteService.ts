import { inject, injectable } from 'tsyringe';

import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { HandleError } from '@shared/errors/HandleError';

interface IRequest {
  userId: string;
  usernameToShare: string;
  noteId: string;
  permission: string;
}

interface IResponse {
  noteId: number;
}

@injectable()
class ShareUserNoteService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    usernameToShare,
    noteId,
    permission,
  }: IRequest): Promise<IResponse> {
    const userToShare = await this.usersRepository.findUserByUsername(
      usernameToShare,
    );
    const userNote = await this.notesRepository.findNoteByNoteId(noteId);
    let permissionToShareTheNote = false;
    let noteAlreadyShared = false;

    if (!userToShare) {
      throw new HandleError('User does not exist.', 404);
    }

    if (!userNote) {
      throw new HandleError(
        'Note does not exists or user is not allowed to share this note.',
        401,
      );
    } else {
      userNote.users.forEach((user) => {
        if (
          Number(user.userId) === Number(userId) &&
          user.permission === 'edit'
        ) {
          permissionToShareTheNote = true;
        }

        if (Number(user.userId) === Number(userToShare.id)) {
          noteAlreadyShared = true;
        }
      });
    }

    if (!permissionToShareTheNote) {
      throw new HandleError(
        'Note does not exists or user is not allowed to share this note.',
        401,
      );
    }

    if (noteAlreadyShared) {
      throw new HandleError('Note already shared with the target user.', 400);
    }

    if (!(permission === 'see' || permission === 'edit')) {
      throw new HandleError(
        "It is necessary to pass in the request the user's permission as 'see' or 'edit'.",
        400,
      );
    }

    const relationUserNote = await this.notesRepository.shareUserNote({
      noteId,
      userId: userToShare.id,
      permission,
    });

    if (!relationUserNote) {
      throw new HandleError('Error trying to share note.');
    }

    return { noteId: relationUserNote.noteId };
  }
}

export { ShareUserNoteService };
