import AppError from '@shared/Errors/AppError';
import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUpdateUserProfile } from '../domain/models/IUpdateUserProfile';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateUserProfile): Promise<IUser> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found', 404);
    }

    const userUpdateEmail = await this.userRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this email.', 403);
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.', 401);
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.', 400);
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserProfileService;
