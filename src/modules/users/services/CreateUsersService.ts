import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IHashProvider } from '../providers/hashProvider/models/IHashProvider';

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}
  public async execute({ name, password, email }: ICreateUser): Promise<IUser> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.', 422);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    await this.userRepository.save(user);

    return user;
  }
}

export default CreateUsersService;
