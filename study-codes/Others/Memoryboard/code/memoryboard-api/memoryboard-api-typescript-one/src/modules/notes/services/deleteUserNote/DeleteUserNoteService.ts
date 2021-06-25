import { inject, injectable } from 'tsyringe';

import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { HandleError } from '@shared/errors/HandleError';

import { Note } from '.prisma/client';

interface IRequest {
  userId: string;
  noteId: string;
}

interface IUserNoteId {
  noteId: number;
}

@injectable()
class DeleteUserNoteService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  async execute({ userId, noteId }: IRequest): Promise<IUserNoteId | Note> {
    const userNote = await this.notesRepository.findNoteByNoteId(noteId);
    let permissionToDeleteTheNote = false;

    if (!userNote) {
      throw new HandleError(
        'Note does not exists or user is not allowed to delete this note.',
        401,
      );
    } else {
      userNote.users.forEach((user) => {
        if (Number(user.userId) === Number(userId)) {
          permissionToDeleteTheNote = true;
        }
      });
    }

    if (!permissionToDeleteTheNote) {
      throw new HandleError(
        'Note does not exists or user is not allowed to delete this note.',
        401,
      );
    }

    if (userNote.users.length === 1) {
      const deletedRelationUserNote =
        await this.notesRepository.deleteRelationUserNote({
          userId,
          noteId,
        });

      if (!deletedRelationUserNote) {
        throw new HandleError(
          'Error when trying to delete the relation User_Note.',
        );
      }

      const deletedUserNote = await this.notesRepository.deleteNoteByNoteId(
        noteId,
      );

      if (!deletedUserNote) {
        throw new HandleError('Error when trying to delete the user note.');
      }

      return deletedUserNote;
    }

    const deletedRelationUserNote =
      await this.notesRepository.deleteRelationUserNote({
        userId,
        noteId,
      });

    if (!deletedRelationUserNote) {
      throw new HandleError(
        'Error when trying to delete the relation User_Note.',
      );
    }

    return { noteId: deletedRelationUserNote.noteId };
  }
}

export { DeleteUserNoteService };
