import { inject, injectable } from 'tsyringe';

import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { HandleError } from '@shared/errors/HandleError';
import regExp from '@config/regExp';

import { Note } from '.prisma/client';

interface IRequest {
  userId: string | number;
  noteId: string | number;
  title: string;
  type: string;
  content: string;
}

function handleValidation(
  pattern: unknown,
  errorMessage: string,
  errorCode: number,
) {
  if (pattern) {
    throw new HandleError(errorMessage, errorCode);
  }
}

@injectable()
class UpdateUserNoteService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  async execute({
    userId,
    noteId,
    title,
    type,
    content,
  }: IRequest): Promise<Note> {
    const note = await this.notesRepository.findNoteByNoteId(noteId);
    const { titleRegExp } = regExp.note;
    let permissionToEditTheNote = false;

    if (!note) {
      throw new HandleError(
        'Note does not exists or user is not allowed to update this note.',
        401,
      );
    } else {
      note.users.forEach((user) => {
        if (
          Number(user.userId) === Number(userId) &&
          user.permission === 'edit'
        ) {
          permissionToEditTheNote = true;
        }
      });
    }

    handleValidation(
      !permissionToEditTheNote,
      'Note does not exists or user is not allowed to update this note.',
      401,
    );

    handleValidation(
      !titleRegExp.test(title),
      'The title cannot have two blank spaces in sequence, it cannot start and end with blank space, and must contain a minimum of 1 character and a maximum of 30.',
      400,
    );

    if (note.title !== title) {
      const checkIfTitleExist = await this.notesRepository.findNoteByTitle(
        title,
      );

      handleValidation(
        checkIfTitleExist,
        "Title already in use by someone's note.",
        400,
      );
    }

    const updatedNote = await this.notesRepository.updateNoteByNoteId({
      noteId,
      title,
      type,
      content,
    });

    handleValidation(!updatedNote, 'Error creating the note.', 400);

    return updatedNote;
  }
}

export { UpdateUserNoteService };
