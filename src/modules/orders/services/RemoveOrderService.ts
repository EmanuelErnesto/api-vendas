import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IShowOrder } from '../domain/models/IShowOrder';

@injectable()
class RemoveOrderService {
  constructor(
    @inject('OrdersRepository')
    private orderRepository: IOrderRepository,
  ) {}
  public async execute({ id }: IShowOrder): Promise<void> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.', 404);
    }

    await this.orderRepository.remove(order);
  }
}

export default RemoveOrderService;
