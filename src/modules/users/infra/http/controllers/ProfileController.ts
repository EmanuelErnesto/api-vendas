import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showUserService = container.resolve(ShowUserService);
    const user_id = request.user.id;

    const user = await showUserService.execute({ user_id });

    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;
    const updateUserProfileService = container.resolve(
      UpdateUserProfileService,
    );

    const user = await updateUserProfileService.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(instanceToInstance(user));
  }
}
