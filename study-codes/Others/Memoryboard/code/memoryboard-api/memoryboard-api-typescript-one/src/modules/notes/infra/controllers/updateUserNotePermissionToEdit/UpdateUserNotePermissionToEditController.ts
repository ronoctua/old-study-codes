import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserNotePermissionToEditService } from '@modules/notes/services/updateUserNotePermissionToEdit/UpdateUserNotePermissionToEditService';

class UpdateUserNotePermissionToEditController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { targetUserUsername, noteId } = request.params;

    const updateUserNotePermissionToEditService = container.resolve(
      UpdateUserNotePermissionToEditService,
    );

    const usernameNoteIdAndPermission =
      await updateUserNotePermissionToEditService.execute({
        userId,
        targetUserUsername,
        noteId,
      });

    return response.status(200).json(usernameNoteIdAndPermission);
  }
}

export { UpdateUserNotePermissionToEditController };
