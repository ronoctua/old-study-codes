import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserService } from '@modules/users/services/authenticateUser/AuthenticateUserService';

class CreateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { usernameOrEmail, unencryptedPassword } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const userProfileAndRefreshToken = await authenticateUserService.execute({
      usernameOrEmail,
      unencryptedPassword,
    });

    return response.status(200).json(userProfileAndRefreshToken);
  }
}

export { CreateSessionController };
