import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenService } from '@modules/users/services/refreshToken/RefreshTokenService';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const headersAccessToken = request.headers.authorization;
    const { id } = request.user;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const refreshToken = await refreshTokenService.execute({
      userId: id,
      headersAccessToken,
    });

    return response.status(200).json(refreshToken);
  }
}

export { RefreshTokenController };
