import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import { ApiError } from '../../shared/utils/api-error';
import { sendSuccess } from '../../shared/utils/response';

export class UserController {
  userService = new UserService();

  async getAll(req: Request, res: Response) {
    const users = await this.userService.getAll();
    sendSuccess(res, users);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getById(req.params.id);
      if (!user) return next(new ApiError('User not found', 404));
      sendSuccess(res, user, '', 200);
    } catch (err: any) {
      next(new ApiError(err));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.create(req.body);
      sendSuccess(res, user, 'User created successfully', 201);
    } catch (err: any) {
      next(new ApiError(err));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.update(req.params.id, req.body);
      if (!user) return next(new ApiError('User not found', 404));
      sendSuccess(res, user, 'User updated successfully', 201);
    } catch (err: any) {
      next(new ApiError(err));
    }
  }
}
