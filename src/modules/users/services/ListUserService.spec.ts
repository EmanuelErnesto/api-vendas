import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import ListUserService from './ListUserService';

let listUsersService: ListUserService;
let fakeUsersRepository: FakeUsersRepository;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUsersService = new ListUserService(fakeUsersRepository);
  });
  it('should be able to return a list that contains all users', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@apivendas.com',
      password: '123456',
    });
    await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@apivendas.com',
      password: '1234567',
    });

    const users = await listUsersService.execute();

    expect(users.length).toBeGreaterThan(0);
  });
});
