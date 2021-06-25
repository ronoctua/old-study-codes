import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAdminStatusService } from '@modules/users/services/updateUserAdminStatus/UpdateUserAdminStatusService';

class UpdateUserAdminStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const { newAdminStatus } = request.body;

    const updateUserAdminStatusService = container.resolve(
      UpdateUserAdminStatusService,
    );

    const userProfile = await updateUserAdminStatusService.execute(
      username,
      newAdminStatus,
    );

    return response.status(200).json(userProfile);
  }
}

export { UpdateUserAdminStatusController };
