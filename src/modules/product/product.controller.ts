import { NextFunction, Request, Response } from 'express';
import { ProductService } from './product.service';
import { ApiError } from '../../shared/utils/api-error';
import { sendSuccess } from '../../shared/utils/response';

export class ProductController {
  productService = new ProductService();

  async getAll(req: Request, res: Response) {
    const products = await this.productService.getAll(req.user);
    sendSuccess(res, products);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.productService.getById(
        req.params.id,
        req.user,
      );
      if (!product) next(new ApiError('Product not found', 404));
      sendSuccess(res, product);
    } catch (err: any) {
      next(new ApiError(err));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, product_type, color } = req.body;
      const userId = req.user.id;

      const product = await this.productService.create({
        name,
        product_type,
        color,
        user_id: userId,
      });
      sendSuccess(res, product, 'Product created successfully', 201);
    } catch (err: any) {
      next(new ApiError(err));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, product_type, color } = req.body;
      const userId = req.user.id;

      const product = await this.productService.update(req.params.id, {
        name,
        product_type,
        color,
        user_id: userId,
      });

      if (!product) next(new ApiError('Product not found', 404));

      sendSuccess(res, product, 'Product updated successfully', 201);
    } catch (err: any) {
      next(new ApiError(err));
    }
  }
}
