import AppError from '@shared/Errors/AppError';
import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
  });
  it('should be able to create a new customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'Emanuel Ernesto',
      email: 'emanuel@testeapivendas.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createCustomerService.execute({
      name: 'Emanuel Ernesto',
      email: 'emanuel@testeapivendas.com',
    });

    await expect(
      createCustomerService.execute({
        name: 'Emanuel Ernesto',
        email: 'emanuel@testeapivendas.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
