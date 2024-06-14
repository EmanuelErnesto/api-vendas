import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import ListCustomerService from './ListCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let listCustomerService: ListCustomerService;

describe('ListCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    listCustomerService = new ListCustomerService(fakeCustomersRepository);
  });

  it('should be able to returns a list that contains all customers', async () => {
    await fakeCustomersRepository.create({
      name: 'jurandir mauricio',
      email: 'jurandirmauricio@gmail.com',
    });
    await fakeCustomersRepository.create({
      name: 'Ana Maria',
      email: 'anamaria@outlook.com',
    });

    const customers = await listCustomerService.execute();

    expect(customers.length).toBeGreaterThan(0);
  });
});
