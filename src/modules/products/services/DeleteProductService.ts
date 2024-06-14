import AppError from '@shared/Errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productRepository.remove(product);
  }
}

export default DeleteProductService;
