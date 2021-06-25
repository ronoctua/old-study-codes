import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowUserDataService } from '@modules/users/services/showUserData/ShowUserDataService';

class ShowUserDataController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserDataService = container.resolve(ShowUserDataService);

    const userData = await showUserDataService.execute(id);

    return response.status(200).json(userData);
  }
}

export { ShowUserDataController };
