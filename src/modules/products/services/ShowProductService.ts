import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';
import { IShowProduct } from '../domain/models/IShowProduct';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({ id }: IShowProduct): Promise<IProduct> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }
}

export default ShowProductService;
