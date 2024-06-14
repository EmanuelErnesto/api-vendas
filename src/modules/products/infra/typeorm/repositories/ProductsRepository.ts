import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IUpdateProductStock } from '@modules/products/domain/models/IUpdateProductStock';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { In, Repository, getRepository } from 'typeorm';
import Product from '../entities/Product';

class ProductsRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async find(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findOne(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ id });

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return product;
  }

  public async findAllByIds(products: Product[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });
    return existsProducts;
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = await this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);
    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);

  }

  public async updateStock(products: IUpdateProductStock[]): Promise<void> {
    await this.ormRepository.save(products);
  }
}

export default ProductsRepository;
