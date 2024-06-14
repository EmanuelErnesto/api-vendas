import AppError from '@shared/Errors/AppError';
import { v4 as uuidv4 } from 'uuid';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import UpdateCustomerService from './UpdateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomerService: UpdateCustomerService;

describe('UpdateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    updateCustomerService = new UpdateCustomerService(fakeCustomersRepository);
  });
  it('should be able to update a customer that exists', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'John Doe',
      email: 'johndoe@apivendas.com',
    });

    expect(
      updateCustomerService.execute({
        id: customer.id,
        name: customer.name,
        email: customer.email,
      }),
    ).resolves.not.toThrow;
  });

  it('should not be able to update a customer that not exists', async () => {
    const id = uuidv4();

    expect(
      updateCustomerService.execute({
        id: id,
        name: 'John Doe',
        email: 'johndoemart@outlook.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to update a customer with a email thats already in use', async () => {
    await fakeCustomersRepository.create({
      name: 'john doe',
      email: 'johndoe@apivendas.com',
    });

    const customer = await fakeCustomersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@apivendas.com',
    });

    expect(
      updateCustomerService.execute({
        id: customer.id,
        name: 'Jane Doe',
        email: 'johndoe@apivendas.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
