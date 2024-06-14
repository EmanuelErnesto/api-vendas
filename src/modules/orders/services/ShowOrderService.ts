import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IShowOrder } from '../domain/models/IShowOrder';
import { IOrder } from '../domain/models/IOrder';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private orderRepository: IOrderRepository) { }
  public async execute({ id }: IShowOrder): Promise<IOrder> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.', 404);
    }

    return order;
  }
}

export default ShowOrderService;
