import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserNotesWithoutPassingContentService } from '@modules/notes/services/getUserNotesWithoutPassingContent/GetUserNotesWithoutPassingContentService';

class GetUserNotesWithoutPassingContentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getUserNotesWithoutPassingContentService = container.resolve(
      GetUserNotesWithoutPassingContentService,
    );

    const userNotesWithoutPassingContent =
      await getUserNotesWithoutPassingContentService.execute(id);

    return response.status(200).json(userNotesWithoutPassingContent);
  }
}

export { GetUserNotesWithoutPassingContentController };
