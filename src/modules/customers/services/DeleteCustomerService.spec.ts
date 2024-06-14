import AppError from '@shared/Errors/AppError';
import { v4 as uuidv4 } from 'uuid';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import DeleteCustomerService from './DeleteCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomerService: DeleteCustomerService;

describe('DeleteCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    deleteCustomerService = new DeleteCustomerService(fakeCustomersRepository);
  });
  it('should be able to delete a customer', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'João Paulo',
      email: 'joaopaulo@gmail.com',
    });

    await deleteCustomerService.execute({
      id: customer.id,
    });

    const foundCustomer = await fakeCustomersRepository.findById(customer.id);
    expect(foundCustomer).toBeUndefined();
  });

  it('should not be able to delete a customer that not exists', async () => {
    const id = uuidv4();

    await expect(deleteCustomerService.execute({ id })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
