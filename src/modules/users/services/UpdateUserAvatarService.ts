import uploadConfig from '@config/upload';
import AppError from '@shared/Errors/AppError';
import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({
    user_id,
    avatarFileName,
  }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;
    await this.userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
