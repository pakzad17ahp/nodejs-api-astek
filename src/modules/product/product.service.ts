import { ApiError } from '../../shared/utils/api-error';
import { canViewAllProducts } from '../../shared/utils/permissions';
import { Product } from './product.model';
import { ProductRepository } from './product.repository';

export class ProductService {
  async getAll(user: any): Promise<Product[]> {
    if (canViewAllProducts(user)) {
      return await ProductRepository.find({ relations: ['user'] });
    }
    return await ProductRepository.find({
      where: { user: { id: user.id } },
      relations: ['user'],
    });
  }

  async getById(id: string, user: any): Promise<Product | null> {
    const product = await ProductRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!product) return null;

    if (user.id == product?.user.id) return product;

    if (canViewAllProducts(user)) return product;

    return null;
  }

  async create(data: Partial<Product>): Promise<Product> {
    const product = await ProductRepository.create(data);
    return await ProductRepository.save(product);
  }

  async update(id: string, data: Partial<Product | null>) {
    const product = await ProductRepository.findOneBy({ id });
    if (!product) return null;
    Object.assign(product, data);
    return await ProductRepository.save(product);
  }
}
