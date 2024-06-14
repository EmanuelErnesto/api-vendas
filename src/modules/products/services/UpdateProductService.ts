import AppError from '@shared/Errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<IProduct> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    const productExists = await this.productRepository.findByName(name);
    if (productExists && name != product.name) {
      throw new AppError('There is already one product with this name', 422);
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
