import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserNotesService } from '@modules/notes/services/getUserNotes/GetUserNotesService';

class GetUserNotesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getUserNotesService = container.resolve(GetUserNotesService);

    const userNotes = await getUserNotesService.execute(id);

    return response.status(200).json(userNotes);
  }
}

export { GetUserNotesController };
