import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import '@modules/users/providers';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository,
);
container.registerSingleton<IProductRepository>(
  'ProductsRepository',
  ProductsRepository,
);
container.registerSingleton<IOrderRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
