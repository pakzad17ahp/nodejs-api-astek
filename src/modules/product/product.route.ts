import { Router } from 'express';
import { ProductController } from './product.controller';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';
import {
  action,
  checkPermission,
  section,
} from '../../shared/middlewares/check-permission.middleware';
import { validationMiddleware } from '../../shared/middlewares/validation.middleware';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

const productController = new ProductController();
const route = Router();

route.get(
  '/',
  authMiddleware(false),
  productController.getAll.bind(productController),
);

route.get(
  '/:id',
  authMiddleware(false),
  productController.getById.bind(productController),
);

route.post(
  '/',
  authMiddleware(false),
  checkPermission(section.product, action.create),
  validationMiddleware(CreateProductDto),
  productController.create.bind(productController),
);

route.put(
  '/:id',
  authMiddleware(false),
  checkPermission(section.product, action.update),
  validationMiddleware(UpdateProductDto),
  productController.update.bind(productController),
);

export default route;
