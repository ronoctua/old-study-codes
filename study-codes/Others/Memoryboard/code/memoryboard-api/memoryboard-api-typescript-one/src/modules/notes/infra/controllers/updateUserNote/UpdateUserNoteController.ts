import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserNoteService } from '@modules/notes/services/updateUserNote/UpdateUserNoteService';

class UpdateUserNoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { noteId } = request.params;
    const { title, type, content } = request.body;

    const updateUserNoteService = container.resolve(UpdateUserNoteService);

    const noteUpdated = await updateUserNoteService.execute({
      userId,
      noteId,
      title,
      type,
      content,
    });

    return response.status(200).json(noteUpdated);
  }
}

export { UpdateUserNoteController };
