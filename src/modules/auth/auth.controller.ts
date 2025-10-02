import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ApiError } from '../../shared/utils/api-error';
import { sendSuccess } from '../../shared/utils/response';

export class AuthController {
  authService = new AuthService();

  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const token = await this.authService.signin(username, password);

      if (!token) {
        return next(new ApiError('Invalid credentials', 401));
      }

      sendSuccess(res, token);
    } catch (err: any) {
      next(new ApiError(err));
    }
  }
}
