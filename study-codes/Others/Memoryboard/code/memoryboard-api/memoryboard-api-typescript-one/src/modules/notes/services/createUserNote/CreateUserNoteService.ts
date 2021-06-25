import { inject, injectable } from 'tsyringe';

import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { HandleError } from '@shared/errors/HandleError';
import regExp from '@config/regExp';

import { Note } from '.prisma/client';

interface IRequest {
  userId: string | number;
  title: string;
  type: string;
}

type IResponse = Omit<Note, 'id'>;

@injectable()
class CreateUserNoteService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  async execute({ userId, title, type }: IRequest): Promise<IResponse> {
    const { titleRegExp } = regExp.note;

    if (!titleRegExp.test(title)) {
      throw new HandleError(
        'The title cannot have two blank spaces in sequence, it cannot start and end with blank space, and must contain a minimum of 1 character and a maximum of 30.',
      );
    }

    const checkIfTitleExist = await this.notesRepository.findNoteByTitle(title);

    if (checkIfTitleExist) {
      throw new HandleError("Title already in use by someone's note.");
    }

    const createdNote = await this.notesRepository.createNote({
      userId,
      title,
      type,
    });

    if (!createdNote) {
      throw new HandleError('Error creating the note.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...noteData } = createdNote;

    return noteData;
  }
}

export { CreateUserNoteService };
