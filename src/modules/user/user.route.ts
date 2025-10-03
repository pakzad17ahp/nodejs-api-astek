import { Router } from 'express';
import { validationMiddleware } from '../../shared/middlewares/validation.middleware';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';
import { UserController } from './user.controller';
import {
  action,
  checkPermission,
  section,
} from '../../shared/middlewares/check-permission.middleware';
import { accountUpdatePermission } from '../../shared/middlewares/account-update-permission.middleware';

const userController = new UserController();
const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get(
  '/',
  authMiddleware(false),
  checkPermission(section.account, action.view),
  userController.getAll.bind(userController),
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get User by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 */
router.get(
  '/:id',
  authMiddleware(false),
  checkPermission(section.account, action.view),
  userController.getById.bind(userController),
);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post(
  '/',
  authMiddleware(false),
  checkPermission(section.account, action.create),
  validationMiddleware(CreateUserDto),
  userController.create.bind(userController),
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put(
  '/:id',
  authMiddleware(false),
  checkPermission(section.account, action.update),
  validationMiddleware(UpdateUserDto),
  accountUpdatePermission,
  userController.update.bind(userController),
);

export default router;
