import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllUsersService } from '@modules/users/services/listAllUsers/ListAllUsersService';

class ListAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllUsersService = container.resolve(ListAllUsersService);

    const allUsersProfile = await listAllUsersService.execute();

    return response.status(200).json(allUsersProfile);
  }
}

export { ListAllUsersController };
