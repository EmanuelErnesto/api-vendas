import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IOrder } from '../domain/models/IOrder';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';

@injectable()
class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private orderRepository: IOrderRepository,
  ) {}
  public async execute(): Promise<IOrder[]> {
    const orders = await this.orderRepository.findAll();

    if (!orders) {
      throw new AppError('Could not find any order', 404);
    }
    return orders;
  }
}

export default ListOrderService;
