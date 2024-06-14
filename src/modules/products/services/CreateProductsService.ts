import AppError from '@shared/Errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProduct } from '../domain/models/IProduct';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 422);
    }

    const redisCache = new RedisCache();

    const product = await this.productRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    return product;
  }
}

export default CreateProductService;
