import CreateSessionsService from '@modules/users/services/CreateSessionsService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessions = container.resolve(CreateSessionsService);

    const user = await createSessions.execute({
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}
