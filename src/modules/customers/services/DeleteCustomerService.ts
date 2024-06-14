import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepository,
  ) {}
  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    await this.customerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
