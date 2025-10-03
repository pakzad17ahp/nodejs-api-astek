import { Router } from 'express';
import { RoleController } from './role.controller';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';
import {
  action,
  checkPermission,
  section,
} from '../../shared/middlewares/check-permission.middleware';
import { validationMiddleware } from '../../shared/middlewares/validation.middleware';
import { CreateRoleDto } from './dtos/create-role.dto';

const router = Router();
const roleController = new RoleController();

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 */
router.get(
  '/',
  authMiddleware(false),
  checkPermission(section.role, action.view),
  roleController.getAll.bind(roleController),
);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role data
 *       404:
 *         description: Role not found
 */
router.get(
  '/:id',
  authMiddleware(false),
  checkPermission(section.role, action.view),
  roleController.getById.bind(roleController),
);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RolePermission'
 *     responses:
 *       201:
 *         description: Role created successfully
 */
router.post(
  '/',
  authMiddleware(false),
  checkPermission(section.role, action.create),
  validationMiddleware(CreateRoleDto),
  roleController.create.bind(roleController),
);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Update a role
 *     tags: [Roles]
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
 *             $ref: '#/components/schemas/RolePermission'
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 */
router.put(
  '/:id',
  authMiddleware(false),
  checkPermission(section.role, action.update),
  roleController.update.bind(roleController),
);

export default router;
