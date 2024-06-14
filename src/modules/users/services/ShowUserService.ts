import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowUser } from '../domain/models/IShowUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/models/IUser';

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({ user_id }: IShowUser): Promise<IUser> {


    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found', 404);
    }

    return user;
  }
}

export default ShowUserService;
