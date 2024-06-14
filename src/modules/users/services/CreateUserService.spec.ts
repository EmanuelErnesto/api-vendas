import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import 'reflect-metadata';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import CreateUsersService from './CreateUsersService';
import AppError from '@shared/Errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUsersService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUsersService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jorge Aluizio',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'Jorge Aluizio',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Jorge Aluizio',
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
