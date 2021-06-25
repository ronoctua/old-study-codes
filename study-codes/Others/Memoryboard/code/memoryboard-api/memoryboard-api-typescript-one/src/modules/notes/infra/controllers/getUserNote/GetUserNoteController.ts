import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserNoteService } from '@modules/notes/services/getUserNote/GetUserNoteService';

class GetUserNoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { noteId } = request.params;

    const getUserNoteService = container.resolve(GetUserNoteService);

    const userNote = await getUserNoteService.execute({ userId, noteId });

    return response.status(200).json(userNote);
  }
}

export { GetUserNoteController };
