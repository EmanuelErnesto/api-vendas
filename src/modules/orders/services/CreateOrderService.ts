import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import AppError from '@shared/Errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IOrder } from '../domain/models/IOrder';
import { IRequestCreateOrder } from '../domain/models/IRequestCreateOrder';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private orderRepository: IOrderRepository,

    @inject('CustomersRepository')
    private customerRepository: ICustomerRepository,

    @inject('ProductsRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({
    customer_id,
    products,
  }: IRequestCreateOrder): Promise<IOrder> {
    const customerExists = await this.customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.', 404);
    }

    const existsProducts = await this.productRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError(
        'Could not find any products with the given ids.',
        404,
      );
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
        404,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
        403,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.orderRepository.create({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    const redisCache = new RedisCache();

    await this.productRepository.updateStock(updatedProductQuantity);

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    return order;
  }
}

export default CreateOrderService;
