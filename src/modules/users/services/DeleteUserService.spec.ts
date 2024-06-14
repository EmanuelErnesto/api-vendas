import AppError from '@shared/Errors/AppError';
import { v4 as uuidv4 } from 'uuid';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import DeleteUserService from './DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUsersService: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    deleteUsersService = new DeleteUserService(fakeUsersRepository);
  });
  it('should be able to delete a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@apivendas.com',
      password: '123456',
    });

    expect(deleteUsersService.execute({ user_id: user.id })).resolves;
  });

  it('should not be able to delete a user that not exists', async () => {
    const id = uuidv4();

    expect(deleteUsersService.execute({ user_id: id })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
