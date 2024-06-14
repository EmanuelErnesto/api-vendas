import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowUser } from '../domain/models/IShowUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({ user_id }: IShowUser): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.userRepository.remove(user);
  }
}

export default DeleteUserService;
