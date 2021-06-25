import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserNoteService } from '@modules/notes/services/createUserNote/CreateUserNoteService';

class CreateUserNoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { title, type } = request.body;

    const createUserNoteService = container.resolve(CreateUserNoteService);

    const noteCreated = await createUserNoteService.execute({
      userId: id,
      title,
      type,
    });

    return response.status(201).json(noteCreated);
  }
}

export { CreateUserNoteController };
