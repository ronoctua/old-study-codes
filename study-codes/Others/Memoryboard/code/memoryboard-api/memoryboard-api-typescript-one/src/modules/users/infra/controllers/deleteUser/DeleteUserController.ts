import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserService } from '@modules/users/services/deleteUser/DeleteUserService';

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteUserService = container.resolve(DeleteUserService);

    const deletedUser = await deleteUserService.execute(id);

    return response.status(200).json(deletedUser);
  }
}

export { DeleteUserController };
