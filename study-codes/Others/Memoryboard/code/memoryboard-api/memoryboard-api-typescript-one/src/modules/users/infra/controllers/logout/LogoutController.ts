import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { LogoutService } from '@modules/users/services/logout/LogoutService';

class LogoutController {
  async handle(request: Request, response: Response): Promise<Response> {
    const headersAccessToken = request.headers.authorization;
    const { id } = request.user;

    const logoutService = container.resolve(LogoutService);

    const tokensDeleted = await logoutService.execute({
      userId: id,
      headersAccessToken,
    });

    return response.status(200).json(tokensDeleted);
  }
}

export { LogoutController };
