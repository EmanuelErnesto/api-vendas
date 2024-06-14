import CreateUsersService from '@modules/users/services/CreateUsersService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ListUserService from '@modules/users/services/ListUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute();

    return response.json(instanceToInstance(users));
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.id;
    const showUser = container.resolve(ShowUserService);
    const user = await showUser.execute({ user_id });

    return response.json(instanceToInstance(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.id;
    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ user_id });

    return response.status(204).json();
  }
}
