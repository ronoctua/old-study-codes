import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserNoteService } from '@modules/notes/services/deleteUserNote/DeleteUserNoteService';

class DeleteUserNoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { noteId } = request.params;

    const deleteUserNoteService = container.resolve(DeleteUserNoteService);

    const userDeletedNote = await deleteUserNoteService.execute({
      userId,
      noteId,
    });

    return response.status(200).json(userDeletedNote);
  }
}

export { DeleteUserNoteController };
