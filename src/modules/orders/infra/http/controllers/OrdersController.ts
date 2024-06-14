import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListOrderService from '@modules/orders/services/ListOrderService';
import RemoveOrderService from '@modules/orders/services/RemoveOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class OrdersController {
  public async index(request: Request, response: Response) {

    const listOrders = container.resolve(ListOrderService);

    const orders = await listOrders.execute();

    return response.json(orders);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;
    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return response.json(order);
  }
  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const removeOrder = container.resolve(RemoveOrderService);

    await removeOrder.execute({ id });

    return response.status(204).json();
  }
}
