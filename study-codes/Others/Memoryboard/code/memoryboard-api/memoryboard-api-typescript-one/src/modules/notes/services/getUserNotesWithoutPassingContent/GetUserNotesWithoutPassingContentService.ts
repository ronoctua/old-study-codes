import { inject, injectable } from 'tsyringe';

import { INotesRepository } from '@modules/notes/repositories/INotesRepository';
import { HandleError } from '@shared/errors/HandleError';

import { Note } from '.prisma/client';

type IResponse = Omit<Note, 'content'>;

@injectable()
class GetUserNotesWithoutPassingContentService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  async execute(userId: string): Promise<IResponse[] | null> {
    const userNotesWithoutContent =
      await this.notesRepository.findNotesByUserIdNoContent(userId);

    if (!userNotesWithoutContent || userNotesWithoutContent.length === 0) {
      throw new HandleError('User has no notes.', 404);
    }

    return userNotesWithoutContent;
  }
}

export { GetUserNotesWithoutPassingContentService };
