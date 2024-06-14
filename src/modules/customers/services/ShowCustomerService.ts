import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { IShowCustomer } from '../domain/models/IShowCustomer';

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepository,
  ) {}
  public async execute({ id }: IShowCustomer): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    return customer;
  }
}

export default ShowCustomerService;
