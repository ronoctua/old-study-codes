import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@modules/users/services/createUser/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, email, unencryptedPassword } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const userProfile = await createUserService.execute({
      username,
      email,
      unencryptedPassword,
    });

    return response.status(201).json(userProfile);
  }
}

export { CreateUserController };
