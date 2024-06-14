import { inject, injectable } from 'tsyringe';
import { ICustomerPaginate } from '../domain/models/ICustomerPaginate';
import { IListCustomersSearchParams } from '../domain/models/IListCustomersSearchParams';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepository,
  ) {}
  public async execute({
    limit,
    page,
  }: IListCustomersSearchParams): Promise<ICustomerPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const customers = await this.customerRepository.find({
      page,
      skip,
      take,
    });

    return customers;
  }
}

export default ListCustomerService;
