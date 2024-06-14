import { DataSource } from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';
import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import { CreateProducts1716309861247 } from './migrations/1716309861247-CreateProducts';
import { CreateUsers1716779263266 } from './migrations/1716779263266-CreateUsers';
import { CreateUserTokens1716935182444 } from './migrations/1716935182444-CreateUserTokens';
import { CreateCustomers1717094962712 } from './migrations/1717094962712-CreateCustomers';
import { CreateOrders1717105384822 } from './migrations/1717105384822-CreateOrders';
import { AddCustomerIdToOrders1717105600445 } from './migrations/1717105600445-AddCustomerIdToOrders';
import { CreateOrdersProducts1717107097965 } from './migrations/1717107097965-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1717107481152 } from './migrations/1717107481152-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1717108322761 } from './migrations/1717108322761-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1716309861247,
    CreateUsers1716779263266,
    CreateUserTokens1716935182444,
    CreateCustomers1717094962712,
    CreateOrders1717105384822,
    AddCustomerIdToOrders1717105600445,
    CreateOrdersProducts1717107097965,
    AddOrderIdToOrdersProducts1717107481152,
    AddProductIdToOrdersProducts1717108322761,
  ],
});
