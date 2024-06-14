import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import { Repository, getRepository } from 'typeorm';
import Order from '../entities/Order';

class OrdersRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;
  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async findAll(): Promise<IOrder[]> {
    const orders = this.ormRepository.find({
      relations: ['order_products', 'customer'],
    });

    return orders;
  }

  public async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async remove(order: Order): Promise<void> {
    await this.ormRepository.remove(order);
  }
}

export default OrdersRepository;
