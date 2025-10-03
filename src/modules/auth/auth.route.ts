import { Router } from 'express';
import { SigninDto } from './dtos/signin.dto';
import { validationMiddleware } from '../../shared/middlewares/validation.middleware';
import { AuthController } from './auth.controller';

const authController = new AuthController();
const router = Router();

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Get JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT
 */
router.post(
  '/signin',
  validationMiddleware(SigninDto),
  authController.signin.bind(authController),
);

export default router;
