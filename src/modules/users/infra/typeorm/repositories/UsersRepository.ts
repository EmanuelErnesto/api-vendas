import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { Repository, getRepository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<User[]> {
    return await this.ormRepository.find();
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return user;
  }
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  public async create({ name, password, email }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      name,
      password,
      email,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export default UsersRepository;
