import AppError from '@shared/Errors/AppError';
import { v4 as uuidv4 } from 'uuid';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import ShowCustomerService from './ShowCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let showCustomerService: ShowCustomerService;

describe('ShowCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    showCustomerService = new ShowCustomerService(fakeCustomersRepository);
  });

  it('should be able to return a specific customer', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'Josefina Nascimento',
      email: 'josefinanascimento@gmail.com',
    });

    expect(
      showCustomerService.execute({ id: customer.id }),
    ).resolves.not.toThrow();
  });

  it('should not be able to return a customer that not exists', async () => {
    const id = uuidv4();

    expect(showCustomerService.execute({ id })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
