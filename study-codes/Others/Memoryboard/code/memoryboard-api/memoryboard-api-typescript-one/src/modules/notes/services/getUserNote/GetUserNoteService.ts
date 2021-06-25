import { inject, injectable } from 'tsyringe';

import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { HandleError } from '@shared/errors/HandleError';

import { Note } from '.prisma/client';

interface IRequest {
  userId: string;
  noteId: string;
}

interface IUsersData {
  username: string;
  avatar: string | null;
  isAdmin: boolean | null;
  permission: string;
}

interface INoteAndUsers extends Note {
  users: IUsersData[];
}

@injectable()
class GetUserNoteService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ userId, noteId }: IRequest): Promise<INoteAndUsers> {
    const userNote = await this.notesRepository.findNoteByNoteId(noteId);
    let permissionToSeeTheNote = false;

    if (!userNote) {
      throw new HandleError(
        'Note does not exists or user is not allowed to view this note.',
        401,
      );
    } else {
      userNote.users.forEach((user) => {
        if (
          Number(user.userId) === Number(userId) &&
          (user.permission === 'edit' || user.permission === 'see')
        ) {
          permissionToSeeTheNote = true;
        }
      });
    }

    if (!permissionToSeeTheNote) {
      throw new HandleError(
        'Note does not exists or user is not allowed to view this note.',
        401,
      );
    }

    const usersArray = await this.usersRepository.findUsersByNoteId(noteId);

    if (!usersArray) {
      throw new HandleError('No users listed within the note.');
    }

    let usersDataArray: IUsersData[] | [] = [];

    for (let index = 0; index < usersArray.length; index += 1) {
      const { notes, username, isAdmin, avatar } = usersArray[index];

      let userPermission = '';

      notes.forEach((note) => {
        if (note.noteId === Number(noteId)) {
          userPermission = note.permission;
        }
      });

      const newUserData: IUsersData = {
        username,
        avatar,
        isAdmin,
        permission: userPermission,
      };

      usersDataArray = [newUserData, ...usersDataArray];
    }

    if (usersDataArray === []) {
      throw new HandleError('No users listed within the note.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { users, ...userNoteData } = userNote;

    const note = { ...userNoteData, users: usersDataArray };

    return note;
  }
}

export { GetUserNoteService };
