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

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
route.get(
  '/',
  authMiddleware(false),
  productController.getAll.bind(productController),
);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product data
 *       404:
 *         description: Product not found
 */
route.get(
  '/:id',
  authMiddleware(false),
  productController.getById.bind(productController),
);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 */
route.post(
  '/',
  authMiddleware(false),
  checkPermission(section.product, action.create),
  validationMiddleware(CreateProductDto),
  productController.create.bind(productController),
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
route.put(
  '/:id',
  authMiddleware(false),
  checkPermission(section.product, action.update),
  validationMiddleware(UpdateProductDto),
  productController.update.bind(productController),
);

export default route;
