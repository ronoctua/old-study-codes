import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShareUserNoteService } from '@modules/notes/services/shareUserNote/ShareUserNoteService';

class ShareUserNoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { usernameToShare, noteId, permission } = request.params;

    const shareUserNoteService = container.resolve(ShareUserNoteService);

    const userSharedNote = await shareUserNoteService.execute({
      userId,
      usernameToShare,
      noteId,
      permission,
    });

    return response.status(200).json(userSharedNote);
  }
}

export { ShareUserNoteController };
