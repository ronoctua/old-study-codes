import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserService } from '@modules/users/services/updateUser/UpdateUserService';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { currentPassword, newPassword, newUsername, newEmail } =
      request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const userProfile = await updateUserService.execute({
      userId: id,
      currentPassword,
      newPassword,
      newUsername,
      newEmail,
    });

    return response.status(200).json(userProfile);
  }
}

export { UpdateUserController };
