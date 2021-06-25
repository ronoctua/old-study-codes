import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteExpiredTokensService } from '@modules/users/services/deleteExpiredTokens/DeleteExpiredTokensService';

class DeleteExpiredTokensController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteExpiredTokensService = container.resolve(
      DeleteExpiredTokensService,
    );

    const deletedTokens = await deleteExpiredTokensService.execute();

    return response.status(200).json(deletedTokens);
  }
}

export { DeleteExpiredTokensController };
