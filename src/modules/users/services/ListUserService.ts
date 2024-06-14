import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute(): Promise<IUser[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}

export default ListUserService;
