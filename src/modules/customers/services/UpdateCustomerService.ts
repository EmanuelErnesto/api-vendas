import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepository,
  ) {}
  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    const customerEmailExists =
      await this.customerRepository.findByEmail(email);

    if (customerEmailExists && email !== customer.email) {
      throw new AppError('There is already customer with this email', 401);
    }

    customer.name = name;
    customer.email = email;

    await this.customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
