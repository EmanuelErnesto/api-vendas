import Order from '@modules/orders/infra/typeorm/entities/Order';
import { ICreateOrder } from '../models/ICreateOrder';
import { IOrder } from '../models/IOrder';

export interface IOrderRepository {
  findById(id: string): Promise<IOrder | undefined>;
  findAll(): Promise<IOrder[]>;
  create(data: ICreateOrder): Promise<Order>;
  remove(order: IOrder): Promise<void>;
}
