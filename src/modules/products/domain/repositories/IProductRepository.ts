import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';
import { IShowProduct } from '../models/IShowProduct';
import { IUpdateProductStock } from '../models/IUpdateProductStock';

export interface IProductRepository {
  find(): Promise<IProduct[]>;
  findByName(name: string): Promise<IProduct | undefined>;
  findAllByIds(products: IShowProduct[]): Promise<IProduct[]>;
  findOne(id: string): Promise<IProduct | undefined>;
  create(product: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  updateStock(product: IUpdateProductStock[]): Promise<void>;
}
