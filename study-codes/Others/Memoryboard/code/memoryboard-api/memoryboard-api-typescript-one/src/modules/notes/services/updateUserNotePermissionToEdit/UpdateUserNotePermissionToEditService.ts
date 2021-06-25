import { inject, injectable } from 'tsyringe';

import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { HandleError } from '@shared/errors/HandleError';

interface IRequest {
  userId: string | number;
  targetUserUsername: string;
  noteId: string | number;
}

interface IResponse {
  username: string;
  noteId: number;
  permission: string;
}

@injectable()
class UpdateUserNotePermissionToEditService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    targetUserUsername,
    noteId,
  }: IRequest): Promise<IResponse> {
    const note = await this.notesRepository.findNoteByNoteId(noteId);
    let permissionToEditTheNote = false;
    let targetUserShareTheNote = false;

    if (!note) {
      throw new HandleError(
        'Note does not exists, or user is not allowed to update this note, or target user does not share the note.',
        401,
      );
    }

    const targetUser = await this.usersRepository.findUserByUsername(
      targetUserUsername,
    );

    if (!targetUser) {
      throw new HandleError('Target user does not exist.', 404);
    }

    note.users.forEach((user) => {
      if (
        Number(user.userId) === Number(userId) &&
        user.permission === 'edit'
      ) {
        permissionToEditTheNote = true;
      }

      if (Number(user.userId) === Number(targetUser.id)) {
        targetUserShareTheNote = true;
      }
    });

    if (!permissionToEditTheNote && !targetUserShareTheNote) {
      throw new HandleError(
        'Note does not exists, or user is not allowed to update this note, or target user does not share the note.',
        401,
      );
    }

    const updatedUserPermission =
      await this.notesRepository.updateNotePermission({
        userId: targetUser.id,
        noteId,
        permission: 'edit',
      });

    if (!updatedUserPermission) {
      throw new HandleError('Error updating note permission.');
    }

    const usernameNoteIdAndPermission = {
      username: targetUserUsername,
      noteId: updatedUserPermission.noteId,
      permission: updatedUserPermission.permission,
    };

    return usernameNoteIdAndPermission;
  }
}

export { UpdateUserNotePermissionToEditService };
