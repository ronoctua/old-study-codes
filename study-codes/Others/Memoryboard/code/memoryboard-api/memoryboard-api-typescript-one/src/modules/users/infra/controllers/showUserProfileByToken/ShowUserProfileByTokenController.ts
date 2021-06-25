import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowUserProfileByTokenService } from '@modules/users/services/showUserProfileByToken/ShowUserProfileByTokenService';

class ShowUserProfileByTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization;

    const showUserProfileByTokenService = container.resolve(
      ShowUserProfileByTokenService,
    );

    const userProfile = await showUserProfileByTokenService.execute(authHeader);

    return response.status(200).json(userProfile);
  }
}

export { ShowUserProfileByTokenController };
