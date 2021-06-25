import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowUserProfileService } from '@modules/users/services/showUserProfile/ShowUserProfileService';

class ShowUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { usernameOrEmail } = request.params;

    const showUserProfileService = container.resolve(ShowUserProfileService);

    const userProfile = await showUserProfileService.execute(usernameOrEmail);

    return response.status(200).json(userProfile);
  }
}

export { ShowUserProfileController };
