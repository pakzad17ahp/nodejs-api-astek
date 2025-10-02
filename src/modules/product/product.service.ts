import { ApiError } from '../../shared/utils/api-error';
import { Product } from './product.model';
import { ProductRepository } from './product.repository';

export class ProductService {
  async getAll(): Promise<Product[]> {
    return await ProductRepository.find();
  }

  async getById(id: string): Promise<Product | null> {
    return await ProductRepository.findOneBy({ id });
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
