import { inject, injectable } from 'tsyringe';

import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { HandleError } from '@shared/errors/HandleError';

import { Note } from '.prisma/client';

@injectable()
class GetUserNotesService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  async execute(userId: string): Promise<Note[] | null> {
    const userNotes = await this.notesRepository.findNotesByUserId(userId);

    if (!userNotes || userNotes.length === 0) {
      throw new HandleError('User has no notes.', 404);
    }

    return userNotes;
  }
}

export { GetUserNotesService };
